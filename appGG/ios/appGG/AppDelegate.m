/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
// @implementation AppDelegate

// #import "AppDelegate.h"

// #import <RCTBundleURLProvider.h>
// #import <RCTRootView.h>
// #import <FBSDKCoreKit/FBSDKCoreKit.h>
// #import <RNGoogleSignin.h>

@implementation AppDelegate

// - (void)applicationDidBecomeActive:(UIApplication *)application {
//   [FBSDKAppEvents activateApp];
// }

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GIDSignIn sharedInstance].clientID = @"679775344404-1dbvov65kca4p2mle29uij01bdr4tpe7.apps.googleusercontent.com";
  [GIDSignIn sharedInstance].delegate = self;
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"appGG"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // [[FBSDKApplicationDelegate sharedInstance] application:application
  //                          didFinishLaunchingWithOptions:launchOptions];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [RNGoogleSignin application:application
                         openURL:url
               sourceApplication:sourceApplication
                      annotation:annotation];
}

@end
// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   [GIDSignIn sharedInstance].clientID = @"679775344404-1dbvov65kca4p2mle29uij01bdr4tpe7.apps.googleusercontent.com";
//   [GIDSignIn sharedInstance].delegate = self;
// //  [GIDSignIn sharedInstance].uiDelegate = self;
//   NSURL *jsCodeLocation;

//   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

//   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                       moduleName:@"appGG"
//                                                initialProperties:nil
//                                                    launchOptions:launchOptions];
//   rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

//   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//   UIViewController *rootViewController = [UIViewController new];
//   rootViewController.view = rootView;
//   self.window.rootViewController = rootViewController;
//   [self.window makeKeyAndVisible];
//   return YES;
// }
// // - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// // {
// //   [GIDSignIn sharedInstance].clientID = @"679775344404-1dbvov65kca4p2mle29uij01bdr4tpe7.apps.googleusercontent.com";
// //   [GIDSignIn sharedInstance].delegate = self;

// //   NSURL *jsCodeLocation;

// //   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

// //   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
// //                                                       moduleName:@"appGG"
// //                                                initialProperties:nil
// //                                                    launchOptions:launchOptions];
// //   rootView.backgroundColor = [UIColor blackColor];

// //   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
// //   UIViewController *rootViewController = [UIViewController new];
// //   rootViewController.view = rootView;
// //   self.window.rootViewController = rootViewController;
// //   [self.window makeKeyAndVisible];
// //   return YES;
// // }

// //- (BOOL)application:(UIApplication *)application
// //didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
// //
// //  [GIDSignIn sharedInstance].clientID = @"679775344404-1dbvov65kca4p2mle29uij01bdr4tpe7.apps.googleusercontent.com";
// //  [GIDSignIn sharedInstance].delegate = self;
// //
// //  return YES;
// //}
// // - (BOOL)application:(UIApplication *)app
// //             openURL:(NSURL *)url
// //             options:(NSDictionary<NSString *, id> *)options {
// //   return [[GIDSignIn sharedInstance] handleURL:url
// //                              sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
// //                                     annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
// // }
// - (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
//   return [RNGoogleSignin application:application
//                              openURL:url
//                    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                           annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
// }

// - (void)signIn:(GIDSignIn *)signIn
// didSignInForUser:(GIDGoogleUser *)user
//      withError:(NSError *)error {
//   // Perform any operations on signed in user here.
//   NSString *userId = user.userID;                  // For client-side use only!
//   NSString *idToken = user.authentication.idToken; // Safe to send to the server
//   NSString *fullName = user.profile.name;
//   NSString *givenName = user.profile.givenName;
//   NSString *familyName = user.profile.familyName;
//   NSString *email = user.profile.email;
//   // ...
// }

// @end
