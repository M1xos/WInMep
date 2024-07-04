// Inizializzazione di i18next
i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'it',
    resources: {
      it: {
        translation: {
          userRuolo1: 'Employee',
          userRuolo2: 'Admin',
          dashboard: 'Dashboard',
          igN: 'Dettagli del dipendente.',
          thisWeek: 'Questa Settimana',
          today: 'OGGI',
          thisWeekCaps: 'QUESTA SETTIMANA',
          thisMonth: 'QUESTO MESE',
          thisYear: 'QUEST\'ANNO',
          absences: 'Assenze',
          holidays: 'Ferie',
          firstHalf: 'Primo semestre',
          // New translations for chart labels
          jan: 'Gen',
          feb: 'Feb',
          mar: 'Mar',
          apr: 'Apr',
          may: 'Mag',
          jun: 'Giu',
          columnChart: 'Grafico a Colonne',
          pieChart: 'Grafico a Torta',
          lineChart: 'Grafico a Linee'
        }
      },
      en: {
        translation: {
          userRuolo1: 'Employee',
          userRuolo2: 'Admin',
          dashboard: 'Dashboard',
          igN: 'Details of the employee',
          thisWeek: 'This Week',
          today: 'TODAY',
          thisWeekCaps: 'THIS WEEK',
          thisMonth: 'THIS MONTH',
          thisYear: 'THIS YEAR',
          absences: 'Absences',
          holidays: 'Holidays',
          firstHalf: 'First half',
          // New translations for chart labels
          jan: 'Jan',
          feb: 'Feb',
          mar: 'Mar',
          apr: 'Apr',
          may: 'May',
          jun: 'Jun',
          columnChart: 'Column Chart',
          pieChart: 'Pie Chart',
          lineChart: 'Line Chart'
        }
      }
    }
  }, function(err, t) {
    if (err) {
      console.error('Error initializing i18next:', err);
      return;
    }
    jqueryI18next.init(i18next, $);
    updateContent();
  });

function updateContent() {
  $('body').localize();
  // Update specific elements that are not automatically handled by i18next
  $('#columnChartPeriod').text(i18next.t('thisWeek'));
  $('#pieChartPeriod').text(i18next.t('thisWeek'));
  $('#lineChartPeriod').text(i18next.t('firstHalf'));
  $('.dropbtn').text(i18next.t('today') + ' ');
  $('.dropdown-content a[data-period="oggi"]').text(i18next.t('today'));
  $('.dropdown-content a[data-period="settimana"]').text(i18next.t('thisWeekCaps'));
  $('.dropdown-content a[data-period="mese"]').text(i18next.t('thisMonth'));
  $('.dropdown-content a[data-period="anno"]').text(i18next.t('thisYear'));

  
  // Update chart titles
  $('#columnChart .chart-title').html(i18next.t('columnChart') + ' <span id="columnChartPeriod">' + i18next.t('thisWeek') + '</span>');
  $('#pieChart .chart-title').html(i18next.t('pieChart') + ' <span id="pieChartPeriod">' + i18next.t('thisWeek') + '</span>');
  $('#lineChart .chart-title').html(i18next.t('lineChart') + ' <span id="lineChartPeriod">' + i18next.t('firstHalf') + '</span>');

  // Trigger an event to update chart labels
  $(document).trigger('languageChanged');
}

// Gestione del cambio lingua
$('#languageToggle').on('click', function() {
  const currentLang = i18next.language;
  const newLang = currentLang === 'it' ? 'en' : 'it';
  i18next.changeLanguage(newLang, (err, t) => {
    if (err) return console.log('Errore nel cambio lingua:', err);
    updateContent();
  });
});

// Add this function to update chart labels
function updateChartLabels() {
  if (window.columnChart) {
    window.columnChart.data.labels = [i18next.t('absences'), i18next.t('smartWorking'), i18next.t('holidays')];
    window.columnChart.update();
  }
  if (window.pieChart) {
    window.pieChart.data.labels = [i18next.t('absences'), i18next.t('smartWorking'), i18next.t('holidays')];
    window.pieChart.update();
  }
  if (window.lineChart) {
    window.lineChart.data.labels = [i18next.t('jan'), i18next.t('feb'), i18next.t('mar'), i18next.t('apr'), i18next.t('may'), i18next.t('jun')];
    window.lineChart.data.datasets[0].label = i18next.t('absences');
    window.lineChart.data.datasets[1].label = i18next.t('smartWorking');
    window.lineChart.data.datasets[2].label = i18next.t('holidays');
    window.lineChart.update();
  }
}

// Add an event listener for language changes
$(document).on('languageChanged', updateChartLabels);
document.getElementById('languageToggle').addEventListener('click', function(event) {
  event.preventDefault(); // Previene il comportamento predefinito del link
  location.reload(); // Ricarica la pagina
});