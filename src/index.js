import G2 from "@antv/g2";
const data = [
  { time: "10:10", call: 4, waiting: -122, people: 122 },
  { time: "10:15", call: 2, waiting: 6, people: 3 },
  { time: "10:20", call: 13, waiting: 2, people: 5 },
  { time: "10:25", call: 9, waiting: 9, people: 1 },
  { time: "10:30", call: 5, waiting: 2, people: 3 },
  { time: "10:35", call: 8, waiting: 2, people: 1 },
  { time: "10:40", call: 13, waiting: 1, people: 2 }
];

const randomDataValue = rate => {
  return Number.parseInt(Math.random() * rate, 10);
};

const chart = new G2.Chart({
  container: "container",
  forceFit: true,
  height: 500
});
chart.source(data, {
  sync: true,
  call: {
    tickCount: 5
  },
  waiting: {
    tickCount: 5
  },
  people: {
    tickCount: 5
  }
});
const randomData = () => {
  data.forEach(item => {
    item.call =
      Math.random() >= 0.5 ? randomDataValue(1000) : randomDataValue(1000) * -1;
    item.waiting =
      Math.random() >= 0.5 ? randomDataValue(500) : randomDataValue(500) * -1;
    item.people =
      Math.random() >= 0.5 ? randomDataValue(400) : randomDataValue(400) * -1;
  });
  chart.changeData(data);
};
randomData();
setInterval(() => {
  randomData();
}, 5000);
chart.legend({
  custom: true,
  items: [
    {
      value: "waiting",
      marker: { symbol: "square", fill: "#008fff", radius: 5 }
    },
    {
      value: "people",
      marker: { symbol: "hyphen", stroke: "#ff3f00", radius: 5, lineWidth: 2 }
    }
  ]
});
chart.axis("waiting", {
  position: "bottom",
  label: {
    textStyle: {
      fill: "#008fff"
    }
  },
  grid: {
    align: "center",
    type: "line",
    hightLightZero: true, // 默认不高亮0轴
    zeroLineStyle: {
      stroke: "#008fff",
      lineWidth: 2,
      lineDash: [0, 0]
    },
    hideFirstLine: true,
    hideLastLine: true
  }
});
chart.axis("people", {
  visible: false,
  position: "right",
  label: {
    textStyle: {
      fill: "#ff3f00"
    }
  },
  tickLine: {
    visible: false
  },
  grid: {
    align: "center",
    type: "line",
    hightLightZero: true, // 默认不高亮0轴
    zeroLineStyle: {
      stroke: "#ff3f00",
      lineWidth: 2,
      lineDash: [0, 0]
    },
    hideFirstLine: true,
    hideLastLine: true
  }
});
chart
  .interval()
  .position("time*waiting")
  .color("#008fff");
chart
  .line()
  .position("time*people")
  .color("#ff3f00")
  .size(3)
  .shape("smooth");
chart
  .point()
  .position("time*people")
  .color("#ff3f00")
  .size(3)
  .shape("circle");
chart.render();
