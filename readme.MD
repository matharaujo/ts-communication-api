## Communication API - REST

#### Using
- **Node - Typescript**
- **Typeorm** for ORM
- **Jest** for testing
- **Supertest** to load the entire server into the tests seamlessly

#### To Start
1) Install dependencies -> _yarn install_;
2) Configure PORT in [.env](.env);
3) Configure your database in [ormconfig.json](ormconfig.json);
4) Run migrations ->  _yarn typeorm migration:run_;
5) Test the project -> _yarn test_;   
6) Start the project ->  _yarn start_;

#### Postman
https://www.getpostman.com/collections/24e34c361d934859340b