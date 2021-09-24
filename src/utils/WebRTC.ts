const win: any = window;

export const RTCIceCandidate =
  win.RTCIceCandidate || win.mozRTCIceCandidate || win.webkitRTCIceCandidate || win.msRTCIceCandidate;

export const RTCPeerConnection =
  win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection || win.msRTCPeerConnection;

export const RTCSessionDescription =
  win.RTCSessionDescription ||
  win.mozRTCSessionDescription ||
  win.webkitRTCSessionDescription ||
  win.msRTCSessionDescription;
