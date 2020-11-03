### Events
Events directory will contain the dispatcher and subscribers that will be used within the Application to notify other component about changes/processes eg: userRegistered, userLoggedIn

NOTE: Events are different from `EventBus`. EventBus will be used for sending events to other microservices whereas events will be used within service.
However subscribers will will receive EventBus instance so that they can dispatch events using `EventBus.publish`.