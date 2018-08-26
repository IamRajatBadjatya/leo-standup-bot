import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [],
  exports: [MatSelectModule, MatRadioModule, MatAutocompleteModule]
})
export class MaterialModule { }
