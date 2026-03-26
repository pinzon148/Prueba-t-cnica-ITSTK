import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, NotificationsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
