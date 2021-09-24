import DeepCodec from 'utils/Jitsi/Deepcodec';

export default class DeepCodecProvider {
  private static instance: DeepCodec | null = null;

  static instantiate() {
    this.instance = new DeepCodec();
  }

  static isInstantiated(): boolean {
    return this.instance !== null;
  }

  static getInstance() {
    if (!this.instance) {
      throw new Error('Deepcodec is not instantiated');
    }
    return this.instance;
  }

  static destroy() {
    this.instance?.destroy();
  }
}
