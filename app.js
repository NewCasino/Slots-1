// Generated by CoffeeScript 1.6.3
(function() {
  var Slots,
    _this = this,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Slots = {};

  Slots.config = {
    targetFPS: 60,
    width: 500,
    height: 400,
    symbol: {
      src: 'symbols_sheet.png',
      width: 100,
      height: 100
    },
    reel: {
      width: 100,
      height: 300,
      regX: 0,
      regY: 0,
      spinDuration: 0.4,
      spinDelay: 0.5,
      speed: 2000
    },
    calculator: {
      payouts: [
        {
          symbol: 0,
          probability: 5,
          wins: [50, 300, 1000]
        }, {
          symbol: 1,
          probability: 10,
          wins: [40, 200, 750]
        }, {
          symbol: 2,
          probability: 10,
          wins: [30, 100, 500]
        }, {
          symbol: 3,
          probability: 10,
          wins: [20, 50, 300]
        }, {
          symbol: 4,
          probability: 30,
          wins: [10, 40, 200]
        }, {
          symbol: 5,
          probability: 30,
          wins: [5, 25, 100]
        }, {
          symbol: 6,
          probability: 30,
          wins: [5, 25, 100]
        }, {
          symbol: 7,
          probability: 30,
          wins: [5, 25, 100]
        }, {
          symbol: 8,
          probability: 10,
          wins: [50, 300, 1000]
        }, {
          symbol: 9,
          probability: 5,
          wins: [400, 1200, 4000]
        }
      ]
    }
  };

  Slots.load = function() {
    var canvas, manifest;
    canvas = document.createElement('canvas');
    canvas.width = this.config.width;
    canvas.height = this.config.height;
    document.body.appendChild(canvas);
    this.stage = new createjs.Stage(canvas);
    manifest = [
      {
        id: 'symbols',
        src: this.config.symbol.src
      }
    ];
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener('complete', this.init);
    return this.loader.loadManifest(manifest);
  };

  Slots.init = function() {
    Slots.calculator = new Slots.Calculator;
    Slots.symbolBuilder = new Slots.SymbolBuilder;
    Slots.state = new Slots.State;
    createjs.Ticker.timingMod = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(Slots.config.targetFPS);
    return createjs.Ticker.addEventListener('tick', Slots.state.tick);
  };

  Slots.Calculator = (function() {
    function Calculator(opts) {
      var config;
      config = {};
      _.extend(config, Slots.config.calculator, opts);
      this.payouts = config.payouts;
      this.payouts.sort(function(a, b) {
        if (a.probability < b.probability) {
          return 1;
        }
        if (a.probability > b.probability) {
          return -1;
        }
        return 0;
      });
      this.probabilityTotal = this.payouts.reduce((function(a, b) {
        return a + b.probability;
      }), 0);
    }

    Calculator.prototype.spawnValue = function() {
      var ceil, floor, num, payout, _i, _len, _ref;
      num = Math.random() * this.probabilityTotal;
      ceil = 0;
      _ref = this.payouts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        payout = _ref[_i];
        floor = ceil;
        ceil += payout.probability;
        if ((floor <= num && num < ceil)) {
          return payout.symbol;
        }
      }
      return payout.symbol;
    };

    Calculator.prototype.getSpinResults = function(opts) {
      var defer, i, j, results, _i, _j;
      defer = $.Deferred();
      results = {};
      results.values = [];
      for (i = _i = 0; _i <= 4; i = ++_i) {
        for (j = _j = 0; _j <= 2; j = ++_j) {
          if (!results.values[i]) {
            results.values[i] = [];
          }
          results.values[i][j] = this.spawnValue();
        }
      }
      setTimeout((function() {
        return defer.resolve(results);
      }), 500);
      return defer.promise();
    };

    return Calculator;

  })();

  Slots.State = (function() {
    function State() {
      this.tick = __bind(this.tick, this);
      this.handleSpinResults = __bind(this.handleSpinResults, this);
      var i, _i;
      this.reels = [];
      for (i = _i = 0; _i <= 4; i = ++_i) {
        this.reels[i] = new Slots.Reel({
          position: i
        });
        Slots.stage.addChild(this.reels[i].container);
      }
      this.spin();
    }

    State.prototype.spin = function() {
      var reel, _i, _len, _ref;
      _ref = this.reels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        reel = _ref[_i];
        reel.startSpin();
      }
      return Slots.calculator.getSpinResults().done(this.handleSpinResults);
    };

    State.prototype.handleSpinResults = function(results) {
      var i, reel, _i, _len, _ref, _results;
      _ref = this.reels;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        reel = _ref[i];
        _results.push(reel.completeSpin({
          values: results.values[i]
        }));
      }
      return _results;
    };

    State.prototype.tick = function(evt) {
      var deltaS;
      deltaS = evt.delta / 1000;
      this.reels.forEach(function(reel) {
        return reel.update(deltaS);
      });
      Slots.stage.update(evt);
    };

    return State;

  })();

  Slots.Reel = (function() {
    Reel.prototype.isSpinning = false;

    function Reel(opts) {
      var config, i, symbol, _i;
      config = {};
      _.extend(config, Slots.config.reel, opts);
      this.spinDuration = config.spinDuration;
      this.spinDelay = config.spinDelay;
      this.position = config.position;
      this.speed = config.speed;
      this.container = new createjs.Container;
      this.container.y = config.regY;
      this.container.x = config.position * config.width + config.regX;
      for (i = _i = 0; _i <= 3; i = ++_i) {
        symbol = Slots.symbolBuilder.newSprite();
        symbol.y = symbol.height * i;
        this.container.addChild(symbol);
      }
    }

    Reel.prototype.startSpin = function() {
      this.values = null;
      this.isSpinning = true;
      this.isFinalPass = false;
      return this.timeSpinning = 0;
    };

    Reel.prototype.completeSpin = function(opts) {
      this.values = opts.values.concat(Slots.calculator.spawnValue());
      if (this.timeSpinning > this.spinDuration) {
        this.timeSpinning = this.spinDuration;
      }
      return this.timeSpinning -= this.spinDelay * this.position;
    };

    Reel.prototype.update = function(deltaS) {
      var deltaPixels, i, lastSymbol, symbol, threshhold, top, _i, _len, _ref;
      if (!this.isSpinning) {
        return;
      }
      this.timeSpinning += deltaS;
      this.isFinalPass = this.timeSpinning >= this.spinDuration && this.values;
      deltaPixels = this.speed * deltaS;
      top = this.container.children[0].y - deltaPixels;
      if (this.isFinalPass && this.values.length === 0) {
        if (top < 0) {
          top = 0;
          this.isSpinning = false;
        }
      } else {
        threshhold = -this.container.children[0].height;
        if (top <= threshhold) {
          top += this.container.children[0].height;
          this.container.removeChildAt(0);
          lastSymbol = _.last(this.container.children);
          if (this.isFinalPass) {
            symbol = Slots.symbolBuilder.newSprite(this.values.shift());
          } else {
            symbol = Slots.symbolBuilder.newSprite();
          }
          symbol.y = lastSymbol.y + lastSymbol.height;
          this.container.addChild(symbol);
        }
      }
      _ref = this.container.children;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        symbol = _ref[i];
        symbol.y = top + (i * symbol.height);
      }
    };

    return Reel;

  })();

  Slots.SymbolBuilder = (function() {
    SymbolBuilder.prototype.config = {};

    function SymbolBuilder(opts) {
      _.extend(this.config, Slots.config.symbol, opts);
      this.config.image = this.config.image || Slots.loader.getResult('symbols');
      this.config.numSymbols = Math.floor(this.config.image.height / this.config.height);
      this.config.numFramsPerSymbol = Math.floor(this.config.image.width / this.config.width);
    }

    SymbolBuilder.prototype.newSprite = function(value) {
      var firstFrame, lastFrame, sheet, sprite, _i, _j, _ref, _ref1, _results, _results1;
      if (value == null) {
        value = Slots.calculator.spawnValue();
      }
      firstFrame = value * this.config.numFramsPerSymbol;
      lastFrame = (value + 1) * this.config.numFramsPerSymbol - 1;
      sheet = new createjs.SpriteSheet({
        images: [this.config.image],
        frames: {
          width: this.config.width,
          height: this.config.height,
          count: this.config.numSymbols * this.config.numFramsPerSymbol
        },
        animations: {
          "static": firstFrame,
          flash: {
            frames: (function() {
              _results1 = [];
              for (var _j = firstFrame; firstFrame <= lastFrame ? _j <= lastFrame : _j >= lastFrame; firstFrame <= lastFrame ? _j++ : _j--){ _results1.push(_j); }
              return _results1;
            }).apply(this).concat((function() {
              _results = [];
              for (var _i = _ref = lastFrame - 1, _ref1 = firstFrame + 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this))
          }
        }
      });
      sprite = new createjs.Sprite(sheet, 'static');
      sprite.framerate = 30;
      sprite.width = this.config.width;
      sprite.height = this.config.height;
      return sprite;
    };

    return SymbolBuilder;

  })();

  Slots.load();

}).call(this);
