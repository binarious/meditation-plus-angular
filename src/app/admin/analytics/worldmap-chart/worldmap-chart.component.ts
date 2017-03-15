import { Component, Input } from '@angular/core';

@Component({
  selector: 'worldmap-chart',
  templateUrl: './worldmap-chart.component.html',
  styleUrls: [
    './worldmap-chart.component.styl'
  ]
})

export class WorldMapChart {
  @Input() data: any;

  fill = {
    "AE" : "",
    "AF" : "",
    "AL" : "",
    "AM" : "",
    "AO" : "",
    "AR" : "",
    "AT" : "",
    "AU" : "",
    "AZ" : "",
    "BA" : "",
    "BD" : "",
    "BE" : "",
    "BF" : "",
    "BG" : "",
    "BI" : "",
    "BJ" : "",
    "BN" : "",
    "BO" : "",
    "BR" : "",
    "BS" : "",
    "BT" : "",
    "BW" : "",
    "BY" : "",
    "BZ" : "",
    "CA" : "",
    "CD" : "",
    "CF" : "",
    "CG" : "",
    "CH" : "",
    "CI" : "",
    "CL" : "",
    "CM" : "",
    "CN" : "",
    "CO" : "",
    "CR" : "",
    "CU" : "",
    "CY" : "",
    "CZ" : "",
    "DE" : "",
    "DJ" : "",
    "DK" : "",
    "DO" : "",
    "DZ" : "",
    "EC" : "",
    "EE" : "",
    "EG" : "",
    "EH" : "",
    "ER" : "",
    "ES" : "",
    "ET" : "",
    "FK" : "",
    "FI" : "",
    "FJ" : "",
    "FR" : "",
    "GA" : "",
    "GB" : "",
    "GE" : "",
    "GF" : "",
    "GH" : "",
    "GL" : "",
    "GM" : "",
    "GN" : "",
    "GQ" : "",
    "GR" : "",
    "GT" : "",
    "GW" : "",
    "GY" : "",
    "HN" : "",
    "HR" : "",
    "HT" : "",
    "HU" : "",
    "ID" : "",
    "IE" : "",
    "IL" : "",
    "IN" : "",
    "IQ" : "",
    "IR" : "",
    "IS" : "",
    "IT" : "",
    "JM" : "",
    "JO" : "",
    "JP" : "",
    "KE" : "",
    "KG" : "",
    "KH" : "",
    "KP" : "",
    "KR" : "",
    "XK" : "",
    "KW" : "",
    "KZ" : "",
    "LA" : "",
    "LB" : "",
    "LK" : "",
    "LR" : "",
    "LS" : "",
    "LT" : "",
    "LU" : "",
    "LV" : "",
    "LY" : "",
    "MA" : "",
    "MD" : "",
    "ME" : "",
    "MG" : "",
    "MK" : "",
    "ML" : "",
    "MM" : "",
    "MN" : "",
    "MR" : "",
    "MW" : "",
    "MX" : "",
    "MY" : "",
    "MZ" : "",
    "NA" : "",
    "NC" : "",
    "NE" : "",
    "NG" : "",
    "NI" : "",
    "NL" : "",
    "NO" : "",
    "NP" : "",
    "NZ" : "",
    "OM" : "",
    "PA" : "",
    "PE" : "",
    "PG" : "",
    "PH" : "",
    "PL" : "",
    "PK" : "",
    "PR" : "",
    "PS" : "",
    "PT" : "",
    "PY" : "",
    "QA" : "",
    "RO" : "",
    "RS" : "",
    "RU" : "",
    "RW" : "",
    "SA" : "",
    "SB" : "",
    "SD" : "",
    "SE" : "",
    "SI" : "",
    "SJ" : "",
    "SK" : "",
    "SL" : "",
    "SN" : "",
    "SO" : "",
    "SR" : "",
    "SS" : "",
    "SV" : "",
    "SY" : "",
    "SZ" : "",
    "TD" : "",
    "TF" : "",
    "TG" : "",
    "TH" : "",
    "TJ" : "",
    "TL" : "",
    "TM" : "",
    "TN" : "",
    "TR" : "",
    "TT" : "",
    "TW" : "",
    "TZ" : "",
    "UA" : "",
    "UG" : "",
    "US" : "",
    "UY" : "",
    "UZ" : "",
    "VE" : "",
    "VN" : "",
    "VU" : "",
    "YE" : "",
    "ZA" : "",
    "ZM" : "",
    "ZW" : ""
  };

  gradient(startColor, endColor, percentFade) {
    // inspired by http://stackoverflow.com/questions/3080421/javascript-color-gradient
    let diffRed = endColor.red - startColor.red;
    let diffGreen = endColor.green - startColor.green;
    let diffBlue = endColor.blue - startColor.blue;
    let diffAlpha = endColor.alpha - startColor.alpha;

    diffRed = (diffRed * percentFade) + startColor.red;
    diffGreen = (diffGreen * percentFade) + startColor.green;
    diffBlue = (diffBlue * percentFade) + startColor.blue;
    diffAlpha = (diffAlpha * percentFade) + startColor.alpha;

    return 'rgba(' + diffRed +', ' + diffGreen + ', ' + diffBlue +', ' + diffAlpha + ')';
  }

  fillChart() {
    if (!this.data.length) {
      return;
    }

    const max = Math.max.apply(Math, this.data.map(function(o){return o.count;}));

    for(let item of this.data) {
      const cc = item._id

      if (cc && this.fill.hasOwnProperty(cc)) {
        this.fill[cc] = this.gradient(
          {red: 0, green: 140, blue: 0, alpha: 140},
          {red: 0, green: 40, blue: 0, alpha: 255},
          item.count / max
        );
      }
    }
  }

  ngOnChanges() {
    this.fillChart();
  }
}
