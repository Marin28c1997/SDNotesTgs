import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SDNotes',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    GoogleAuth:{
      scopes:['profile', 'email'],
      serviceClientId:"71405197754-7kjjq4inpbs2hao5aknp3u1on6tcosru.apps.googleusercontent.com",
      forceCodeForRefreshToken:true,
    }
  }
};

export default config;
