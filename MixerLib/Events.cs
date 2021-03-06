﻿using System;

namespace MixerLib
{
	public class FollowedEventArgs : EventArgs
	{
		public bool IsFollowing { get; set; }
		public string UserName { get; set; }
		public uint ChannelId { get; set; }
	}

	public class HostedEventArgs : EventArgs
	{
		public bool IsHosting { get; set; }
		public string HosterName { get; set; }
		public uint CurrentViewers { get; set; }
		public uint ChannelId { get; set; }
	}

	public class SubscribedEventArgs : EventArgs
	{
		public string UserName { get; set; }
		public uint ChannelId { get; set; }
	}

	public class ResubscribedEventArgs : EventArgs
	{
		public string UserName { get; set; }
		public uint TotalMonths { get; set; }
		public DateTime Since { get; set; }
		public uint ChannelId { get; set; }
	}
}
