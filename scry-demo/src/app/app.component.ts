import { Component, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "scry-demo";
  loaded: boolean = false;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<AnimationPlayState>;
  symbol = "AAPL";
  url = "https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=demo";
  financialStatement: any = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient) {
    this.http.get<any>(this.url).subscribe(data => {
      this.financialStatement = data;
      this.createdDisplayComlumn(this.financialStatement[0]);

      this.dataSource = new MatTableDataSource(this.financialStatement);
      this.loaded = true;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createdDisplayComlumn(obj) {
    Object.keys(obj).forEach((key, index) => {
      this.displayedColumns.push(key);
    });
  }
}
