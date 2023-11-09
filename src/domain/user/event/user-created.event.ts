import {EventsHandler, IEvent, IEventHandler} from "@nestjs/cqrs";

export class UserCreatedEvent implements IEvent {
  public constructor(readonly id: string) {
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {

  public handle(event: UserCreatedEvent): any {
    console.log("handle: ", event);
  }

}