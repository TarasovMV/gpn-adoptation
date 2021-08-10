import UIKit
import Capacitor
import Firebase
 
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
 
  var window: UIWindow?
 
 
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    UIApplication.shared.applicationIconBadgeNumber = 0
    FirebaseApp.configure()
    return true
  }

  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
      Messaging.messaging().apnsToken = deviceToken
      Messaging.messaging().token { (token, error) in
          if let error = error {
              NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidFailToRegisterForRemoteNotificationsWithError.name()), object: error)
          } else if let token = token {
              NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidRegisterForRemoteNotificationsWithDeviceToken.name()), object: token)
              }
          }
      }
}
