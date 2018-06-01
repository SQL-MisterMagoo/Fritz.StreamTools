﻿using Fritz.StreamLib.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwitchLib.Models.API.v5.Streams;
using TwitchLib.Services;

namespace Fritz.StreamTools.Services
{


	public class TwitchService : IHostedService, IStreamService //, IChatService
	{

		/// <summary>
		/// Service for connecting and monitoring Twitch
		/// </summary>
		public FollowerService Service { get; private set; }
		private IConfiguration Configuration { get; }
		public ILogger Logger { get; }

		private static int ErrorsReadingViewers = 0;

		public event EventHandler<ServiceUpdatedEventArgs> Updated;
		//public event EventHandler<ChatMessageEventArgs> ChatMessage;
		//public event EventHandler<ChatUserInfoEventArgs> UserJoined;
		//public event EventHandler<ChatUserInfoEventArgs> UserLeft;

		public TwitchService(IConfiguration config, ILoggerFactory loggerFactory)
		{
			this.Configuration = config;
			this.Logger = loggerFactory.CreateLogger("StreamServices");
		}

		public Task StartAsync(CancellationToken cancellationToken)
		{
			return StartTwitchMonitoring();
		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			return StopTwitchMonitoring();
		}

		public static int _CurrentFollowerCount;
		public int CurrentFollowerCount
		{
			get { return _CurrentFollowerCount; }
			internal set { _CurrentFollowerCount = value; }
		}

		public static int _CurrentViewerCount;
		private Timer _Timer;

		public int CurrentViewerCount { get { return _CurrentViewerCount; } }

		private string ClientId { get { return Configuration["StreamServices:Twitch:ClientId"]; } }

		private string Channel { get { return Configuration["StreamServices:Twitch:Channel"]; } }

		private string ChannelId { get { return Configuration["StreamServices:Twitch:UserId"]; } }

		public string Name { get { return "Twitch"; } }

		public TimeSpan? Uptime => null;

		public bool IsAuthenticated => throw new NotImplementedException();

		private async Task StartTwitchMonitoring()
		{
			var api = new TwitchLib.TwitchAPI(clientId: ClientId);
			Service = new FollowerService(api);
			Service.SetChannelByName(Channel);
			await Service.StartService();

			var v5 = new TwitchLib.Channels.V5(api);

			var follows = await v5.GetAllFollowersAsync(ChannelId);
			_CurrentFollowerCount = follows.Count;
			Service.OnNewFollowersDetected += Service_OnNewFollowersDetected;

			var v5Stream = CreateTwitchStream(api);
			if (v5Stream == null) {
				await Task.Delay(2000);
				await StartTwitchMonitoring();
				return;
			}
			var myStream = await v5Stream.GetStreamByUserAsync(ChannelId);
			_CurrentViewerCount = myStream.Stream?.Viewers ?? 0;

			Logger.LogInformation($"Now monitoring Twitch with {_CurrentFollowerCount} followers and {_CurrentViewerCount} Viewers");

			_Timer = new Timer(CheckViews, v5Stream, 0, 5000);

		}



		private async void CheckViews(object state)
		{

			if (!(state is TwitchLib.Streams.V5)) return;

			TwitchLib.Streams.V5 v5Stream = state as TwitchLib.Streams.V5;

			StreamByUser myStream = null;

			try
			{

				myStream = await v5Stream.GetStreamByUserAsync(ChannelId);

			}
			catch (JsonReaderException ex)
			{

				Logger.LogError($"Unable to read stream from Twitch: {ex}");
				return;

			}
			catch (Exception)
			{
				Logger.LogError($"Error while communicating with Twitch");
				return;
			}

			if (_CurrentViewerCount != (myStream.Stream?.Viewers ?? 0))
			{
				_CurrentViewerCount = (myStream.Stream?.Viewers ?? 0);
				Updated?.Invoke(null, new ServiceUpdatedEventArgs
				{
					ServiceName = Name,
					NewViewers = _CurrentViewerCount
				});
			}

		}

		private TwitchLib.Streams.V5 CreateTwitchStream(TwitchLib.TwitchAPI api) {

			TwitchLib.Streams.V5 v5Stream = null;

			try
			{
				v5Stream = new TwitchLib.Streams.V5(api);
				TwitchService.ErrorsReadingViewers = 0;
			}
			catch (Exception ex)
			{
				TwitchService.ErrorsReadingViewers++;
				Logger.LogError(ex, $"Error reading viewers.. {TwitchService.ErrorsReadingViewers} consecutive errors");
			}

			return v5Stream;

		}

		internal void Service_OnNewFollowersDetected(object sender,
		TwitchLib.Events.Services.FollowerService.OnNewFollowersDetectedArgs e)
		{
			Interlocked.Exchange(ref _CurrentFollowerCount, _CurrentFollowerCount + e.NewFollowers.Count);
			Logger.LogInformation($"New Followers on Twitch, new total: {_CurrentFollowerCount}");

			Updated?.Invoke(this, new ServiceUpdatedEventArgs
			{
				ServiceName = Name,
				NewFollowers = _CurrentFollowerCount
			});
		}

		private Task StopTwitchMonitoring()
		{
			Service.StopService();
			return Task.CompletedTask;
		}

		public Task<bool> SendMessageAsync(string message)
		{
			throw new NotImplementedException();
		}

		public Task<bool> SendWhisperAsync(string userName, string message)
		{
			throw new NotImplementedException();
		}

		public Task<bool> TimeoutUserAsync(string userName, TimeSpan time)
		{
			throw new NotImplementedException();
		}

		public Task<bool> BanUserAsync(string userName)
		{
			throw new NotImplementedException();
		}

		public Task<bool> UnbanUserAsync(string userName)
		{
			throw new NotImplementedException();
		}
	}

}
