var calculatorBoxClass = "calculator-cmp-box";

function iddHandler(button, ev) {
  var linkHref = button.attr("href");
  button.removeAttr("href");
  button.click(function(ev) {
    var modalLink = $(".idd-modal-dialog .modal-footer a");
    modalLink.attr("href", linkHref);
    ev.preventDefault;
  });
  button.attr("data-toggle", "modal");
  button.attr("data-target", "#modal-idd");
}

function addIddToCalculatorBlock(ev) { iddHandler($(".calculator-cmp-box"), ev); }

var calculatorUrlsList = [
"https://www.hdi-tarifeonline.de/",
"https://www.hdi.de/rechner_kfz/hdi_neu2/",
"https://www.hdi.de/rechner_kfz/hdi_neu2/motorrad/",
"https://www.hdi.de/privatkunden/versicherungen/wohngebaeude/mehrfamilien-haeuser-rechner",
"https://www.hdi.de/privatkunden/versicherungen/glasversicherung-rechner",
"https://www.hdi.de/privatkunden/versicherungen/haftpflicht/privathaftpflichtversicherung-rechner",
"https://www.hdi.de/privatkunden/versicherungen/haftpflicht/tierhalterhaftpflichtversicherung-rechner",
"https://www.hdi.de/privatkunden/versicherungen/haftpflicht/haftpflicht-nebensparten-rechner",
"https://www.hdi.de/privatkunden/versicherungen/rechtsschutz-rechner",
"https://www.hdi.de/firmenkunden/service/online-services/online-rechner",
"https://www.hdi.de/freiberufler/service/online-services/online-rechner",
"https://www.roland-rechtsschutz.de/privatkunden/konfigurator_privatkunden/konfigurator_privatkunden_hdi.html",
"https://hdi.situative.net/fahrerkreiserweiterung.html"
]

var calculatorLabelsList = [ "jetzt berechnen"]

function genericIddHandler(e) {
    var links = $("a").filter(
        function() {
            var href = $(this).attr("href");
            var doesMatchUrl = href ? ($.grep(calculatorUrlsList, function(v) { return href.startsWith(v);}).length > 0) : false;
            var doesMatchLabel = $.inArray($(this).text().toLowerCase().replace(/\u00AD/g,''), calculatorLabelsList) > -1;
            var notInsideVisualHeader = $(this).parents(".component-visualheader").length === 0;
            return notInsideVisualHeader && (doesMatchUrl || doesMatchLabel);
    });
    links.each( function(idx, btn) {
        var button = $(btn);
        console.log(button);
        var linkHref = button.attr("href");
        button.removeAttr("href");
        button.click(function(ev) {
          var modalLink = $(".idd-modal-dialog .modal-footer a");
          modalLink.attr("href", linkHref);
          ev.preventDefault;
      });
        button.attr("data-toggle", "modal");
        button.attr("data-target", "#modal-idd");
    });
}

function addIdd(ev) {
  var consultantCookieState = window.hdiStore.getState().consultantCookie;
  var hasConsultant = consultantCookieState.hasConsultant;

  if(hasConsultant) {
    addIddToCalculatorBlock(ev);
    genericIddHandler();
  }
}

if(window.attachEvent) {
    window.attachEvent('onload', addIdd);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            addIdd(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = addIdd;
    }
}