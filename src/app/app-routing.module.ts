import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { DeleteCategoryComponent } from './features/category/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './features/category/update-category/update-category.component';

const routes: Routes = [

  {
    path: 'admin/categories',
    component: CategoryListComponent,
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'admin/categories/delete/:id', 
    component: DeleteCategoryComponent
  },
  {
    path: 'admin/categories/update/:id', 
    component: UpdateCategoryComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
