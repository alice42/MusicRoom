#import "DZRPlayer.h"

#import "React/RCTBridge.h"
#import "React/RCTBridgeModule.h"
#import "React/RCTEventDispatcher.h"

@interface DeezerManager : NSObject <RCTBridgeModule, DZRPlayerDelegate>
+ (RCTBridge*)globalBridge;
@end
