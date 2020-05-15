// Some data we can work with

const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
  ];

  const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

  let dataset  = document.getElementById('dataset');
  let inventorsP = document.createElement('pre');
  inventorsP.classList.add('inventors');
  dataset.append(inventorsP);
  inventorsP.append('Inventors: ', JSON.stringify(inventors, null, 1));
  let peopleP = document.createElement('pre');
  peopleP.classList.add('people');
  dataset.append(peopleP);
  peopleP.append('People: ', JSON.stringify(people, null, 1));


  // Array.prototype.filter()
  const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600)

  let filter  = document.getElementById('filter');
  filter.append(JSON.stringify(fifteen));

  // Array.prototype.map()
  const fnLn = inventors.map(inventor => `${inventor.first} ${inventor.last}`);

  let fullname = document.getElementById('fullname');
  fullname.append(JSON.stringify(fnLn));

  // Array.prototype.sort()
  const birthyear = inventors.sort((a, b) => a.year - b.year);
  
  let birthday = document.getElementById('birthday');
  birthday.append(JSON.stringify(birthyear));

  // Array.prototype.reduce()
  // 4. How many years did all the inventors live all together?
  const totalYearsLived = inventors.reduce((total, inventor) => {
      return total + (inventor.passed - inventor.year);
  }, 0);

  let totalYears = document.getElementById('total-years');
  totalYears.append(JSON.stringify(totalYearsLived));

  // 5. Sort the inventors by years lived

  const yearsLived = inventors.sort((a, b) => (b.passed - b.year) - (a.passed - a.year));

  let yearsLivedTable = document.getElementById('years-lived');
  yearsLivedTable.append(JSON.stringify(yearsLived))

  // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name

  const boulevardsInParis = [ 'Boulevard Auguste-Blanqui', 'Boulevard Barbès', 'Boulevard Beaumarchais', 'Boulevard de l\'Amiral-Bruix', 'Boulevard Mortier', 'Boulevard Poniatowski', 'Boulevard Soult', 'Boulevard des Capucines', 'Boulevard de la Chapelle', 'Boulevard de Clichy', 'Boulevard du Crime', 'Boulevard du Général-d\'Armée-Jean-Simon', 'Boulevard Haussmann', 'Boulevard de l\'Hôpital', 'Boulevard des Italiens', 'Boulevard Lefebvre', 'Boulevard de la Madeleine', 'Boulevard de Magenta', 'Boulevard Marguerite-de-Rochechouart', 'Boulevard Montmartre', 'Boulevard du Montparnasse', 'Boulevard Raspail', 'Boulevard Richard-Lenoir', 'Boulevard Saint-Germain', 'Boulevard Saint-Michel', 'Boulevard de Sébastopol', 'Boulevard de Strasbourg', 'Boulevard du Temple', 'Boulevard Voltaire', 'Boulevard de la Zone' ]

  const de = boulevardsInParis.filter(streetName => streetName.includes('de'));

  let parisBoulevards = document.getElementById('paris-boulevards');
  parisBoulevards.append(JSON.stringify(de));

  // 7. sort Exercise
  // Sort the people alphabetically by last name

  const alpha = people.sort((last, next) => {
    const [aLast, aFirst] = last.split(', ');
    const [bLast, bFirst] = next.split(', ');
    return bLast - aLast;
  })

  let sortByLast = document.getElementById('name-sort');
  sortByLast.append(JSON.stringify(alpha));

  // 8. Reduce Exercise
  // Sum up the instances of each of these
  const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

  const reducedData = data.reduce(function(obj, item) {
    if(!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
    return obj
  }, {});

  let totalTransportation = document.getElementById('transport');
  totalTransportation.append(JSON.stringify(reducedData));