
#1: Angular version
	Angular CLI: 8.0.3
	Node: 10.16.0
	OS: win32 x64
	Angular: 8.0.2
	... animations, common, compiler, compiler-cli, core, forms
	... language-service, platform-browser, platform-browser-dynamic
	... router

	Package                           Version
	-----------------------------------------------------------
	@angular-devkit/architect         0.800.3
	@angular-devkit/build-angular     0.800.3
	@angular-devkit/build-optimizer   0.800.3
	@angular-devkit/build-webpack     0.800.3
	@angular-devkit/core              8.0.3
	@angular-devkit/schematics        8.0.3
	@angular/cli                      8.0.3
	@ngtools/webpack                  8.0.3
	@schematics/angular               8.0.3
	@schematics/update                0.800.3
	rxjs                              6.4.0
	typescript                        3.4.5
	webpack                           4.30.0

#2: Creating Project
	Either issue following command and then select scss from the options displayed. Created the project with routing module. 
		ng new ToolTipWithScssSample
	or issue the following command 
		ng new ToolTipWithScssSample --style=scss
		
	then add bootstrap [bootstrap@4.3.1]
		npm install bootstrap --save
		
#3: Add your own scss and bootstrap scss to the angular.json file
	"styles": [
	  "node_modules/bootstrap/scss/bootstrap.scss",
	  "src/styles.scss"
	],
	
#4: Adding directive, home component and setting routing
	app.component.ts
		Open and change title to "ToolTip With Scss Sample"
		
	app.component.html
		Copy the contents from the sample
		
	styles.scss
		Copy the contents from the sample
		
	HomeComponent
		ng g c Home
		
		Make sure that the HomeComponent is is added to the app.modules 
		
		Add route to HomeComponent in app-routing.module.ts
	
		import { HomeComponent } from './home/home.component';
		const routes: Routes = [
		  {
			path: '', component: HomeComponent
		  },
		];
	
		and then move the home.component.html content or just copy paste the follwing 
		
		<div class="row">
		  <div class="col-sm-2">
			<button class="btn btn-primary" appTooltop="Button 1 is clicked" placement="left">Button 1 (click)</button>
		  </div>
		  <div class="col-sm-2">
			 <button class="btn btn-primary" appTooltop="Button 2 is clicked" placement="top">Button 2 (click)</button>
		  </div>
		</div>
	
	Directive
		ng g d tooltop 
		
		Make sure that the directive is added to the app.modules.ts  
	

#: Run the app
	If downloading the sample then issue the following command to install all the npm packages
		npm install 
	Then issue 
		ng serve 
	finally go to 
		http://localhost:4200/
	