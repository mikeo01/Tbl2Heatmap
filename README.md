# Tbl2Heatmap

Generates a simple heatmap based on tabular data. In development.

Uses:
```javascript
  Heatmap.generateHeatmap({
      getShade: () => Heatmap.Colors.Red, // See tbl2heatmap.js/.ts for colour list or provided your own
      getTable: () => document.getElementById('tabe')
  });
```

```html
  <table id="table">
    <thead>
      <tr>
        <th>Header</th>
        <th>Header #1</th>
        <th>Header #2</th>
        <th>Header #3</th>
        <th>Header #4</th>
      </tr>
    </thead>
    <tbody class="heatmap">
      <tr class="heatmap-row">
        <td>Body</td>
        <td class="heatmap-cell">5%</td>
        <td class="heatmap-cell">8%</td>
        <td class="heatmap-cell">1%</td>
        <td class="heatmap-cell">0%</td>
      </tr>
      <tr class="heatmap-row">
        <td>Body</td>
        <td class="heatmap-cell">11%</td>
        <td class="heatmap-cell">4%</td>
        <td class="heatmap-cell">1%</td>
        <td class="heatmap-cell">0%</td>
      </tr>
      <tr class="heatmap-row">
        <td>Body</td>
        <td class="heatmap-cell">19%</td>
        <td class="heatmap-cell">7%</td>
        <td class="heatmap-cell">2%</td>
        <td class="heatmap-cell">4%</td>
      </tr>
     </tbody>
  </table>
```
