const theAs = [
  '1 (Strongly Disagree)',
  '2 (Disagree)',
  '3 (Neutral)',
  '4 (Agree)',
  '5 (Strongly Agree)'
];

const theQs = [
  `I have a student mentality when it comes to most things.`,
  `There isn't anything I can't do.`,
  `People say I'm a very patient person.`,
  `Money is less important than spending time with people that make us happy.`,
  `You can't judge a fish's intelligence by it's ability to climb a tree.`,
  `The earth is round.`,
  `We know what we know, know what we don't, dont know what we do, and don't know what we don't.`,
  `Watching TV is a waste of time.`,
  `If you can save someone time then you're saving them money.`,
  `The US dollar will collapse in the next 10 years.`
];

$(document).ready(() => {
  const qSection = $('#theQs');

  let x = 0;
  theQs.forEach(Q => {
    x++;
    const singleQ = $('<div class="Q">');
    let qNum = $('<h2>').text('Question: ' + x);
    let qString = $('<h4>').text(Q);
    const formGroup = $('<div class="dropDowns">');
    const dropDown = $('<select class="form-control option">');
    theAs.forEach(gotAns => {
      let option = $('<option>').text(gotAns);
      dropDown.append(option);
    });
    dropDown.attr('id', 'select' + x);
    formGroup.append(dropDown);
    singleQ.append(qNum, qString, formGroup);
    qSection.append(singleQ);
  });

  $('#submit').on('click', e => {
    e.preventDefault();

    let name = $('#name').val();
    let image = $('#image').val();

    if (name.length > 0 && image.length > 0) {
      let scores = [];

      Object.keys($('.option')).forEach(key => {
        if (scores.length < theQs.length) {
          scores.push($('.option')[key].value.charAt(0));
        }
      });

      let addToAPI = {
        name: name,
        photo: image,
        answers: scores
      };

      $.post('/api/friends', addToAPI, newAns => {
        $('#modalGood').empty();
        $('#name').val('');
        $('#image').val('');

        newAns.forEach(matchedWith => {
          let matchedDiv = $('<div class="matchedWith">');
          let name = matchedWith.name;
          let image = matchedWith.photo;
          let showName = $('<h2>').text(name);
          let photo = $('<img>').attr('src', image);
          matchedDiv.append(showName, photo);

          $('#modalGood').append(matchedDiv);
        });

        if (newAns.length > 1) {
          $('.modal-title').text('Great minds think alike.');
        } else {
          $('.modal-title').text(`Here's your new friendo!`);
        }

        $('#showModal').modal();
      });
    } else {
      $('#modalBad').modal();
    }
  });
});
