import { NgModule, NgModuleFactoryLoader } from '@angular/core';

import * as routes from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HelloWorldModuleNgFactory } from './views/hello-world/hello-world.module.ngfactory';
import { TodosModuleNgFactory } from './views/todos/todos.module.ngfactory';

export class MyLoader extends NgModuleFactoryLoader {
  load(id: string) {
    switch (id) {
      case routes.helloModule:
        return Promise.resolve(HelloWorldModuleNgFactory);
      case routes.todosModule:
        return Promise.resolve(TodosModuleNgFactory);
      default:
        throw new Error(`Unrecognized route id ${id}`);
    }
  }
}

@NgModule({
  imports: [AppModule],
  bootstrap: [AppComponent],
  providers: [{ provide: NgModuleFactoryLoader, useClass: MyLoader }]
})
export class AppModuleDev {
}