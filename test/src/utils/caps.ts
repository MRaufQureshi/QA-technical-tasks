
class Capabilities {

  isNativeTest =
    [{
      'appium:platformName': 'android',
      'appium:deviceName': 'Pixel 4 API 31',
      'appium:app':'./test/src/utils/android/api.apk',
      'appium:platformVersion': '12',
      'appium:uiautomator2ServerInstallTimeout': 150000,
      'appium:appWaitForLaunch': true,
      'appium:disableWindowAnimation': true,
      'appium:autoGrantPermissions': true,
      'appium:clearSystemFiles': true,
      'appium:nativeWebScreenshot': true,
      'appium:adbExecTimeout': 80000,
      'appium:automationName': 'uiautomator2'
    }]


}

export default new Capabilities();
