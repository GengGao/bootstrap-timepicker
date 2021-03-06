describe('Mouse events feature', function() {
  'use strict';

  var $input1,
    $input2,
    $input3,
    $timepicker1,
    $timepicker2,
    $timepicker3,
    tp1,
    tp2,
    tp3;

  beforeEach(function () {
    loadFixtures('timepicker.html');

    $input1 = $('#timepicker1');
    $timepicker1 = $input1.timepicker();
    tp1 = $timepicker1.data('timepicker');

    $input2 = $('#timepicker2');
    $timepicker2 = $input2.timepicker({
      template: 'modal',
      showSeconds: true,
      minuteStep: 30,
      secondStep: 30,
      defaultTime: false
    });
    tp2 = $timepicker2.data('timepicker');

    $input3 = $('#timepicker3');
    $timepicker3 = $input3.timepicker({
      defaultTime: '23:15:20',
      showMeridian: false,
      showSeconds: true
    });
    tp3 = $timepicker3.data('timepicker');
  });

  afterEach(function () {
    $input1.data('timepicker').remove();
    $input2.data('timepicker').remove();
    $input3.data('timepicker').remove();
    $input1.remove();
    $input2.remove();
    $input3.remove();
  });

  it('should be shown and trigger show events on input click', function() {
    var showEvent = false,
      shownEvent = false;

    $input1.on('show', function() {
      showEvent = true;
    });
    $input1.on('shown', function() {
      shownEvent = true;
    });

    $input1.parents('div').find('.add-on').trigger('click');

    expect(tp1.isOpen).toBe(true);
    expect(showEvent).toBe(true);
    expect(shownEvent).toBe(true);
  });

  it('should be hidden and trigger hide events on click outside of widget', function() {
    var hideEvent = false,
      hiddenEvent = false;

    $input1.on('hide', function() {
      hideEvent = true;
    });
    $input1.on('hidden', function() {
      hiddenEvent = true;
    });

    $('body').trigger('mousedown');
    expect(tp1.isOpen).toBe(false);
    expect(hideEvent).toBe(true);
    expect(hiddenEvent).toBe(true);
  });

  it('should increment hour on button click', function() {
    tp1.setTime('11:30 AM');
    tp1.update();

    tp1.$widget.find('a[data-action="incrementHour"]').trigger('click');

    expect(tp1.getTime()).toBe('12:30 PM');
  });

  it('should decrement hour on button click', function() {
    tp1.setTime('12:30 PM');
    tp1.update();

    tp1.$widget.find('a[data-action="decrementHour"]').trigger('click');

    expect(tp1.getTime()).toBe('11:30 AM');
  });

  it('should increment minute on button click', function() {
    tp1.setTime('11:30 AM');
    tp1.update();

    tp1.$widget.find('a[data-action="incrementMinute"]').trigger('click');

    expect(tp1.getTime()).toBe('11:45 AM');
  });

  it('should decrement minute on button click', function() {
    tp1.setTime('12:30 PM');
    tp1.update();

    tp1.$widget.find('a[data-action="decrementMinute"]').trigger('click');

    expect(tp1.getTime()).toBe('12:15 PM');
  });

  it('should increment second on button click', function() {
    tp2.setTime('11:30:15 AM');
    tp2.update();

    tp2.$widget.find('a[data-action="incrementSecond"]').trigger('click');

    expect(tp2.getTime()).toBe('11:30:30 AM');
  });

  it('should decrement second on button click', function() {
    tp2.setTime('12:30:15 PM');
    tp2.update();

    tp2.$widget.find('a[data-action="decrementSecond"]').trigger('click');

    expect(tp2.getTime()).toBe('12:29:45 PM');
  });

  it('should toggle meridian on button click', function() {
    tp1.setTime('12:30 PM');
    tp1.update();

    tp1.$widget.find('a[data-action="toggleMeridian"]').first().trigger('click');
    expect(tp1.getTime()).toBe('12:30 AM');
    tp1.$widget.find('a[data-action="toggleMeridian"]').last().trigger('click');
    expect(tp1.getTime()).toBe('12:30 PM');
  });

  it('should select all contents of widget input on click', function() {
      tp1.setTime('11:55 AM');

      tp1.$widget.find('.bootstrap-timepicker-hour').trigger('click');
      var hour1 = window.getSelection().toString();
      expect(hour1).toBe('11');

      tp1.$widget.find('.bootstrap-timepicker-minute').trigger('click');
      var minute1 = window.getSelection().toString();
      expect(minute1).toBe('55');

      tp1.$widget.find('.bootstrap-timepicker-meridian').trigger('click');
      var meridian1 = window.getSelection().toString();
      expect(meridian1).toBe('AM');
  });
});
