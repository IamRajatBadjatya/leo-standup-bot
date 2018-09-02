import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
  ],
  declarations: [],
  exports: [MatSelectModule, MatRadioModule, MatAutocompleteModule, MatInputModule, MatChipsModule]
})
export class MaterialModule { }
