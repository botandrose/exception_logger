ExceptionLogger = {
  filters: ['exception_names', 'controller_actions', 'date_ranges'],
  setPage: function(num) {
    $('page').value = num;
    $('query-form').onsubmit();
  },
  
  setFilter: function(context, name) {
    var filterName = context + '_filter'
    $(filterName).value = ($F(filterName) == name) ? '' : name;
    this.deselect(context, filterName);
    $('page').value = '1';
    $('query-form').onsubmit();
  },

  deselect: function(context, filterName) {
    $$('#' + context + ' a').each(function(a) {
      var value = $(filterName) ? $F(filterName) : null;
      a.className = (value && (a.getAttribute('title') == value || a.innerHTML == value)) ? 'selected' : '';
    });
  }
}

Event.observe(window, 'load', function() {
  ExceptionLogger.filters.each(function(context) {
    $(context + '_filter').value = '';
  });
});

Ajax.Responders.register({
  onCreate: function() {
    if($('activity') && Ajax.activeRequestCount > 0) $('activity').visualEffect('appear', {duration:0.25});
  },

  onComplete: function() {
    if($('activity') && Ajax.activeRequestCount == 0) $('activity').visualEffect('fade', {duration:0.25});
  }
});