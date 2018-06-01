import { RouterTestingModule } from '@angular/router/testing';


import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { SeoDetailsComponent } from './seo-details/seo-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

describe('Application routes ', () => {

  it('sholuld contain a route for  /seoDetails', () => {
    expect(AppRoutingModule).toContain({ path: 'seoDetails', component: SeoDetailsComponent });
  })

  it('sholuld contain a route for  /notesDetails', () => {
    expect(AppRoutingModule).toContain({ path: 'notesDetails', component: NotesComponent });
  })

})

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create an instnace of the application component', () => {
    expect(component).toBeTruthy();
  })

  it('it should navigate users to Seo Detials page ', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    router.navigate(['/seoDetails']);
    expect(spy).toHaveBeenCalledWith(['/seoDetails']);
  })

  
  it('it should navigate users to Notes Detials page ', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    router.navigate(['/notesDetails']);
    expect(spy).toHaveBeenCalledWith(['/notesDetails']);
  })


  it('should have a router-outlet Tag', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBe(null);
  })

});

