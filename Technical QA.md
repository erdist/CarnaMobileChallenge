# Technical QA, ReadME

> #### Summary of what was built and what was not
>


> - The Application is a simple CRUD management application on User and Content models. It also offers Authorization functionality such as Login, Register, Logout and Remember Me thanks to AsyncStorage. Login functinality offers some edge cases such as 'No user found' or 'Wrong password.' So users can create their own accounts and login/ logout and sustain even if app is restarted again. Any action that is done on CRUD screens is notified to the user via Notifications Tab. A simple Profile Tab is also created to show user information. Import/Export data(excel) is only supported on back-end side.(Postman or Swagger can be used.)
>
> - This application does not offer Admin based CRUD appplication, which means, User and Content CRUD operations is not designed to filter with Admin such as adminId. So, any admin can operate on any User and Content models freely. Register functionality does not have a response handler so some operations such as signin up with same email twice will not be handled. 
>


> #### Context on decisions and framework choices.
>
> - Front-End: React Native with TypeScript
> - Front-End CLI: Expo CLI
> - State Management: MobX
> - Back-end: .NET Core, EntityFramework Core(ORM)
> - Back-end architecture: CLEAN Architecture
> - Database: PostgreSQL
>
> CLEAN Architecture, seperates our logic into layers and every layer is only dependent on one layer below.  I've chosen to use CLEAN Architecture because, it's neither framework nor database dependent. I thought it is a good idea to seperate my API(where my endpoints resides) and my Application(where my whole business model is).
>  .NET Core might be good idea to build a clean back-end thanks to its OOP environment. It offers higher performance.
>  Typescript for its strict mode to minimize errors and automating axios requests.
>  MobX is chosen over Redux as it offers multiple store capability. Even in this project there are 3 different stores. As the project scales up, using one store might be messy.

> #### Areas for improvements
>
> - Register response handling
> - Unit testing. (I used MediatR for middleware, that creates a bridge between my endpoints and my database context, There was no good source to create a Mock environment with MediatR to make automated tests.)
> - End-to-end tests for endpoints
> - GraphQL (If I had the time and knowledge, I would definitely add graphQLto reduce the number of endpoints and make it maintainable) HotChocolate looks promising.
>
> #### Technical Questions
> #### Libraries added to the front-end
> - AsyncStorage (Keeping JWT token and authenticating user if not logged out.)
> - React Navigation Material Tabs (Creating bottom and top tab screens)
> - Axios (HTTPRequest)
> - Expo Linear Gradient (for customizing buttons)
> - UUID (Creating GUID for back-end)
> - Animatable (for simple animated objects such as logos)
> - mobx mobx-react-lite (state management)
> 

> #### `npm start` and `dotnet watch run`
> #### 4-5 days I had to spend to the project. Most of the time passed by watching respective tutorials and debugging. See area for improvements for the rest.
> #### Init setters are added to the C# 9.0 version. But I couldn't find a chance to use it properly as it dictates using immutable properties where I extensively set my properties over and over again.
> #### Logging is a good practice to track down performance issues, although I had to use it for debugging :).
