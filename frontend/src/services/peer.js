class PeerService {
      constructor() {
            if (!this.peer) {
                  this.peer = new RTCPeerConnection({
                        iceServers: [
                              { urls: 'stun:stun.l.google.com:19302' },
                              { urls: 'stun:global.stun.twilio.com:3478' },
                        ],
                  });
            }
      }

      async getAnswer(offer) {
            if (this.peer) {
                  await this.peer.setRemoteDescription(offer);
                  const ans = await this.peer.createAnswer();
                  await this.peer.setLocalDescription(new RTCSessionDescription(ans));
                  return ans;
            }
      }

      async setLocalDescription(ans) {
            if (this.peer) {
                  // console.log('Current Signaling State:', this.peer.signalingState); // Debugging

                  // if (this.peer.signalingState === 'have-local-offer') {
                  await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
                  // } else {
                  //       console.warn(
                  //             'Skipping setRemoteDescription: Wrong signaling state:',
                  //             this.peer.signalingState,
                  //       );
                  // }
            }
      }

   
}

export default new PeerService();
