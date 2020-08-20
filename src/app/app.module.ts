import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from './interceptor/http-config.interceptor';
import { AppComponent } from './appComponent/app.component';
import { ListsComponent } from './components/lists/lists.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AppComponent, ListsComponent, MoviesComponent, AuthComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
