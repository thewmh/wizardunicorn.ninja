import { useState, useCallback } from 'react';

const STYLES = `
#rcc form { font-family: 'Segoe UI', system-ui, sans-serif; text-align: center; }
#rcc input[type="number"] { border: none; background-color: transparent; font-family: inherit; font-size: 16px; border-bottom: 1px solid var(--border); padding: 8px 4px; color: var(--text); width: 90px; text-align: right; }
#rcc .fs { margin: 10px auto; display: grid; grid-template-columns: minmax(120px, 50%) minmax(80px, 20%); align-items: center; gap: 6px; }
#rcc .fs label { text-align: right; color: var(--text-muted); font-size: 14px; margin-bottom: 0; }
#rcc .btns button { display: block; margin: 12px auto 0; padding: 8px 28px; border-radius: 6px; background-color: var(--accent); color: #fff; border: none; cursor: pointer; font-size: 14px; }
#rcc .links { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
#rcc .lnk { color: var(--accent); text-decoration: none; padding: 4px 12px; border-radius: 4px; font-size: 13px; cursor: pointer; }
#rcc .lnk:hover, #rcc .lnk.active { background-color: var(--border); color: var(--text); }
`;

interface IngredientEntry {
  key: string;
  label: string;
  baseValue: number;
}

interface Recipe {
  name: string;
  ingredients: IngredientEntry[];
}

const recipes: Recipe[] = [
  {
    name: 'Caramels',
    ingredients: [
      { key: 'agave', label: 'Agave', baseValue: 438 },
      { key: 'sugar', label: 'Granulated Sugar', baseValue: 800 },
      { key: 'cream', label: 'Heavy Whipping Cream', baseValue: 120 },
      { key: 'fruit', label: 'Roasted Fruit', baseValue: 100 },
      { key: 'salt', label: 'Salt', baseValue: 7 },
      { key: 'flav', label: 'Natural Flavoring', baseValue: 6 },
      { key: 'vanilla', label: 'Vanilla Extract', baseValue: 23 },
      { key: 'butter', label: 'Butter', baseValue: 330 },
    ],
  },
  {
    name: 'Makgeolli',
    ingredients: [
      { key: 'flour', label: 'Sweet Rice Flour', baseValue: 200 },
      { key: 'w1', label: 'Water', baseValue: 1000 },
      { key: 'nuruk', label: 'Nuruk', baseValue: 100 },
      { key: 'yeast', label: "Brewer's Yeast", baseValue: 2.5 },
      { key: 'w2', label: 'More Water', baseValue: 100 },
      { key: 'rice', label: 'Sweet Rice', baseValue: 800 },
    ],
  },
  {
    name: 'Pizza Dough',
    ingredients: [
      { key: 'f1', label: 'White Flour', baseValue: 500 },
      { key: 'w3', label: 'Water', baseValue: 500 },
      { key: 'iyeast', label: 'Instant Yeast', baseValue: 0.4 },
      { key: 'f2', label: 'More White Flour', baseValue: 500 },
      { key: 'w4', label: 'More Water', baseValue: 250 },
      { key: 'salt2', label: 'Fine Sea Salt', baseValue: 20 },
    ],
  },
];

function roundTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/** Scale all remaining ingredients based on the changed one. */
function scaleIngredient(
  targetKey: string,
  newValue: number,
  entries: IngredientEntry[],
  updated: Record<string, number>,
): void {
  const target = entries.find((e) => e.key === targetKey);
  if (!target) return;

  for (const entry of entries) {
    if (entry.key === targetKey) continue;
    const baseVal = entry.baseValue;
    const ratio = baseVal / newValue;
    const scaled = roundTwo(ratio >= 1 ? baseVal / ratio : baseVal * ratio);
    updated[entry.key] = scaled;
  }
}

function defaultValues(recipe: Recipe): Record<string, number> {
  return Object.fromEntries(recipe.ingredients.map((i) => [i.key, i.baseValue]));
}

export default function RecipeCalc() {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  // Stored base (reset target) — updated when recipe switches
  const [baseValues, setBaseValues] = useState(() => defaultValues(recipes[0]));
  // Tracked values (potentially scaled from base)
  const [values, setValues] = useState(() => defaultValues(recipes[0]));

  const recipe = recipes[recipeIndex];

  const handleRecipeSwitch = useCallback((index: number) => {
    setRecipeIndex(index);
    const newBase = defaultValues(recipes[index]);
    setBaseValues(newBase);
    setValues({ ...newBase });
    setEditMode(false);
  }, []);

  // Reset all ingredients to current recipe's base values
  const resetAll = useCallback(() => {
    const fromBase = Object.fromEntries(
      recipe.ingredients.map((i) => [i.key, i.baseValue]),
    );
    setValues({ ...fromBase });
    setEditMode(false);
  }, [recipe]);

  const handleIngredientChange = useCallback(
    (key: string, text: string) => {
      const raw = parseFloat(text);
      if (isNaN(raw)) return; // reject non-numeric input

      setValues((prev) => {
        const updated = { ...prev };
        updated[key] = roundTwo(raw);

        scaleIngredient(key, raw, recipe.ingredients, updated);
        setBaseValues(updated);

        return updated;
      });
    },
    [recipe],
  );

  const toggleEdit = useCallback(() => {
    setEditMode((e) => !e);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div id="rcc">
        {/* Recipe nav */}
        <nav className="links" aria-label="Recipe selector">
          {recipes.map((r, i) => (
            <a
              key={r.name}
              href="#"
              className={`lnk${i === recipeIndex ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleRecipeSwitch(i);
              }}
            >
              {r.name}
            </a>
          ))}
        </nav>

        {/* Recipe title */}
        <h2 style={{ fontFamily: 'inherit', fontWeight: 600, color: 'var(--text)', margin: '0 0 16px' }}>
          {recipe.name}
        </h2>

        {/* Ingredient list */}
        <form onSubmit={(e) => e.preventDefault()}>
          {recipe.ingredients.map((ing) => (
            <div key={ing.key} className="fs">
              <label htmlFor={ing.key}>{ing.label}</label>
              <input
                type="number"
                id={ing.key}
                value={values[ing.key]}
                step="any"
                disabled={!editMode}
                onChange={(e) => handleIngredientChange(ing.key, e.target.value)}
              />
            </div>
          ))}
        </form>

        {/* Buttons */}
        <div className="btns">
          <button onClick={toggleEdit}>
            {editMode ? 'Save' : 'Edit'}
          </button>
          <button onClick={resetAll}>Reset</button>
        </div>
      </div>
    </>
  );
}
