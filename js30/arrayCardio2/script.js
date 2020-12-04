const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ];

  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
  ];

  const adult = people.some(function(person) {
      const currentYear = (new Date()).getFullYear();
      if (currentYear - person.year >= 19) {
          return true;
      }
  })

  console.log(adult)

  const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);

  console.log({allAdults})

  const whichComment = comments.find(function(comment) {
      if (comment.id === 823423) {
          return comment.text
        }
    });

  console.log({whichComment})

  const commentIndex = comments.findIndex(function(comment) {
      if (comment.id === 823423) {
          return comment
      }
  });

  console.log(commentIndex)

  const updatedComments = [
      ...comments.slice(0, commentIndex),
      ...comments.slice(commentIndex + 1)
  ]

  console.table(updatedComments)