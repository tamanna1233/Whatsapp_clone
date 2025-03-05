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

      // async getAnswer(offer) {
      //       if (this.peer) {
      //             await this.peer.setRemoteDescription(offer);
      //             const ans = await this.peer.createAnswer();
      //             await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      //             return ans;
      //       }
      // }

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

      async getoffer() {
            if (this.peer) {
                  const offer = await this.peer.createOffer();
                  await this.peer.setLocalDescription(new RTCSessionDescription(offer));
                  return offer;
            }
      }
      async getAnswer(offer) {
            if (this.peer) {
                  await this.peer.setRemoteDescription(offer);
                  const ans = await this.peer.createAnswer();
                  await this.peer.setLocalDescription(ans);
                  return ans;
            }
      }

      // async setLocalDescription(ans) {
      //       if (this.peer) {
      //             await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      //       }
      // }
      // In PeerService class add these methods:
getVideoSender() {
      return this.peer.getSenders().find(sender => sender.track?.kind === 'video');
    }
    
    getAudioSender() {
      return this.peer.getSenders().find(sender => sender.track?.kind === 'audio');
    }
    
    async replaceVideoTrack(newTrack) {
      const videoSender = this.getVideoSender();
      if (videoSender) return videoSender.replaceTrack(newTrack);
      if (newTrack) return this.peer.addTrack(newTrack, this.currentStream);
    }
    
    async replaceAudioTrack(newTrack) {
      const audioSender = this.getAudioSender();
      if (audioSender) return audioSender.replaceTrack(newTrack);
      if (newTrack) return this.peer.addTrack(newTrack, this.currentStream);
    }
}

export default new PeerService();
