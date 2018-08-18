import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  private pets: string[] = [];
  private url: string = "https://localhost:44350/api/pets";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<string[]>(this.url).subscribe(data => {
      this.pets = data;
    });
  }
}
