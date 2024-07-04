// Inizializzazione di i18next
i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'it',
    resources: {
      it: {
        translation: {
          login: 'Login',
          enterNameSurname: 'Inserisci il tuo nome e cognome',
          selectRole: 'Seleziona il tuo ruolo',
          employee: 'Dipendente',
          manager: 'Manager',
          administrator: 'Amministratore',
          enter: 'Entra'
        }
      },
      en: {
        translation: {
          login: 'Login',
          enterNameSurname: 'Enter your name and surname',
          selectRole: 'Select your role',
          employee: 'Employee',
          manager: 'Manager',
          administrator: 'Administrator',
          enter: 'Enter'
        }
      }
    }
  }, function(err, t) {
    jqueryI18next.init(i18next, $);
    updateContent();
  });

function updateContent() {
  $('body').localize();
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
