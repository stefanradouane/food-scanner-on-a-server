// Labrary that makes flags from text
import { flag } from 'country-emoji';

const detailpage = document.querySelector('.detailpage');

const detailPage = () => {
  // Select elements
  const detailPageCountries = document.querySelector('.detailpage__countries');
  const detailPageTable = document.querySelector('.detailpage__table');
  const detailPageAllergens = document.querySelector('.detailpage__allergens');

  // If product found
  // make page
  detailPageAllergens.textContent = allergieList(
    detailPageAllergens.textContent.split(',')
  );
  const countries = countryList(detailPageCountries.textContent.split(','));
  detailPageCountries.textContent = 'Product wordt verkocht in: ';
  detailPageCountries.appendChild(countries);

  // Make alergie list
  function allergieList(list) {
    let returnedValue = 'Allergenen: ';
    if (list.length == 0) {
      returnedValue += 'Geen';
    } else {
      list.forEach((item, i, all) => {
        const words = item.split(':');
        if (all.length - 1 == i) {
          returnedValue +=
            String(words[1])[0].toUpperCase() + String(words[1]).substr(1);
        } else if (all.length - 2 == i) {
          returnedValue +=
            String(words[1])[0].toUpperCase() +
            String(words[1]).substr(1) +
            ' ' +
            '&' +
            ' ';
        } else {
          returnedValue +=
            String(words[1])[0].toUpperCase() +
            String(words[1]).substr(1) +
            ',' +
            ' ';
        }
      });
    }
    return returnedValue;
  }

  // Make an emoji list for the countries
  function countryList(list) {
    let returnedObject = document.createElement('span');

    list.forEach((item) => {
      const words = item.split(':');
      // console.log(words[1])
      if (words[1].includes('-')) {
        // Only library :)
        const countryFlag = flag(words[1].replaceAll('-', ' '));
        returnedObject.textContent += countryFlag + ' ';
      } else {
        const countryFlag = flag(words[1]);
        returnedObject.textContent += countryFlag + ' ';
      }
    });
    return returnedObject;
  }

  // Set protein icon
  // if (isNaN(product.nutriments.proteins_100g)) {
  //     detailPageProtein.textContent = "Eiwitten onbekend"
  // } else {
  //     detailPageProtein.textContent = `${product.nutriments.proteins_100g}${product.nutriments.proteins_unit} eiwitten / 100${product.nutriments.proteins_unit}`
  // }

  // Make nutriments table
  const nutrimentsTable = () => {
    if (!product.nutriments) {
      return;
    }

    const tableBody = document.createElement('tbody');
    const firstRow = document.createElement('tr');
    const firstRowItem1 = document.createElement('td');
    firstRowItem1.textContent = 'Voedingswaarden';
    const firstRowItem2 = document.createElement('td');
    firstRowItem2.textContent = '100g';
    const firstRowItem3 = document.createElement('td');
    firstRowItem3.textContent = product.serving_size;

    if (!product.serving_size) {
      firstRowItem3.style.display = 'none';
    }

    firstRow.appendChild(firstRowItem1);
    firstRow.appendChild(firstRowItem2);
    firstRow.appendChild(firstRowItem3);

    tableBody.appendChild(firstRow);

    let nutriments = [
      'Energie',
      'Vetten',
      'Koolhydraten',
      'Suiker',
      'Eiwitten',
      'Zout',
    ];

    nutriments.map((nutriment, i) => {
      const tableRowDefault = document.createElement('tr');
      const tableItemDefault = document.createElement('td');

      const tableItem2 = document.createElement('td');
      const tableItem3 = document.createElement('td');

      if (!product.serving_size) {
        tableItem3.style.display = 'none';
      }

      // Switch for the nutriment table
      switch (nutriment) {
        case 'Energie':
          if (
            !isNaN(product.nutriments['energy-kj_100g']) ||
            !isNaN(product.nutriments.energy)
          ) {
            tableItemDefault.textContent = nutriment;
            tableItem2.textContent = `${
              product.nutriments['energy-kj_100g']
                ? product.nutriments['energy-kj_100g']
                : product.nutriments.energy
            } ${
              product.nutriments['energy-kj_unit']
                ? product.nutriments['energy-kj_unit']
                : 'kJ'
            } / ${product.nutriments['energy-kcal_100g']} ${
              product.nutriments['energy-kcal_unit']
            }`;
          } else {
            tableItemDefault.style.display = 'none';
            tableItem2.style.display = 'none';
          }
          if (
            !isNaN(product.nutriments['energy-kj_serving']) ||
            product.nutriments.energy_serving
          ) {
            tableItem3.textContent = `${
              product.nutriments['energy-kj_serving']
                ? product.nutriments['energy-kj_serving']
                : product.nutriments.energy_serving
            } ${
              product.nutriments['energy-kj_unit']
                ? product.nutriments['energy-kj_unit']
                : 'kJ'
            } / ${product.nutriments['energy-kcal_serving']} ${
              product.nutriments['energy-kcal_unit']
            }`;
          } else {
            tableItem3.style.display = 'none';
          }

          break;
        case 'Vetten':
          if (!isNaN(product.nutriments.fat_100g)) {
            tableItemDefault.textContent = nutriment;
            tableItem2.textContent = `${product.nutriments.fat_100g} ${product.nutriments.fat_unit}`;
          } else {
            tableItemDefault.style.display = 'none';
            tableItem2.style.display = 'none';
          }

          if (!isNaN(product.nutriments.fat_serving)) {
            tableItem3.textContent = `${product.nutriments.fat_serving} ${product.nutriments.fat_unit}`;
          } else {
            tableItem3.style.display = 'none';
          }

          break;
        case 'Koolhydraten':
          if (!isNaN(product.nutriments.carbohydrates_100g)) {
            tableItemDefault.textContent = nutriment;
            tableItem2.textContent = `${product.nutriments.carbohydrates_100g} ${product.nutriments.carbohydrates_unit}`;
          } else {
            tableItemDefault.style.display = 'none';
            tableItem2.style.display = 'none';
          }
          if (!isNaN(product.nutriments.carbohydrates_serving)) {
            tableItem3.textContent = `${product.nutriments.carbohydrates_serving} ${product.nutriments.carbohydrates_unit}`;
          } else {
            tableItem3.style.display = 'none';
          }

          break;
        case 'Suiker':
          if (!isNaN(product.nutriments.sugars_100g)) {
            tableItemDefault.textContent = nutriment;
            tableItem2.textContent = `${product.nutriments.sugars_100g} ${product.nutriments.sugars_unit}`;
          } else {
            tableItemDefault.style.display = 'none';
            tableItem2.style.display = 'none';
          }

          if (!isNaN(product.nutriments.sugars_serving)) {
            tableItem3.textContent = `${product.nutriments.sugars_serving} ${product.nutriments.sugars_unit}`;
          } else {
            tableItem3.style.display = 'none';
          }

          break;
        case 'Eiwitten':
          if (!isNaN(product.nutriments.proteins_100g)) {
            tableItemDefault.textContent = nutriment;
            tableItem2.textContent = `${product.nutriments.proteins_100g} ${product.nutriments.proteins_unit}`;
          } else {
            tableItemDefault.style.display = 'none';
            tableItem2.style.display = 'none';
          }
          if (!isNaN(product.nutriments.proteins_serving)) {
            tableItem3.textContent = `${product.nutriments.proteins_serving} ${product.nutriments.proteins_unit}`;
          } else {
            tableItem3.style.display = 'none';
          }

          break;
        case 'Zout':
          if (!isNaN(product.nutriments.salt_100g)) {
            tableItemDefault.textContent = nutriment;
            tableItem2.textContent = `${product.nutriments.salt_100g} ${product.nutriments.salt_unit}`;
          } else {
            tableItemDefault.style.display = 'none';
            tableItem2.style.display = 'none';
          }
          if (!isNaN(product.nutriments.salt_serving)) {
            tableItem3.textContent = `${product.nutriments.salt_serving} ${product.nutriments.salt_unit}`;
          } else {
            tableItem3.style.display = 'none';
          }

          break;
      }

      tableRowDefault.appendChild(tableItemDefault);
      tableRowDefault.appendChild(tableItem2);
      tableRowDefault.appendChild(tableItem3);

      tableBody.appendChild(tableRowDefault);
    });
    return tableBody;
  };

  // Reset table
  if (detailPageTable.children.length >= 1) {
    // detailPageTable.children[0].remove()
  }

  // Append table
  // detailPageTable.appendChild(nutrimentsTable())
};

// // close detail page
// const control = document.querySelector(".detailpage__control");

// control.addEventListener("click", () => {
//     // Clear URL
//     setUrl(search);
//     if (search) {
//         search.id = ""
//     }
//     detailPage.ariaExpanded = "false"
// })

if (detailpage) {
  detailPage();
}
