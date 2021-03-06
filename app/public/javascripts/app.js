(function(Slots, undefined){
Slots.config = Slots.config || {};
_.extend(Slots.config, {
  "targetFPS": 60,
  "width": 500,
  "height": 400,
  "background": "/images/bg.png",
  "buttons": {
    "src": "/images/buttons_sheet.png",
    "spin": {
      "sheet": {
        "width": 100,
        "height": 50,
        "x": 0,
        "y": 0,
        "frames": 5
      },
      "position": {
        "x": 215,
        "y": 325
      }
    },
    "arrows": {
      "sheets": {
        "up": {
          "width": 15,
          "height": 25,
          "x": 0,
          "y": 75,
          "frames": 5
        },
        "down": {
          "width": 15,
          "height": 25,
          "x": 0,
          "y": 50,
          "frames": 5
        }
      },
      "positions": {
        "decreaseLines": {
          "x": 10,
          "y": 338
        },
        "increaseLines": {
          "x": 50,
          "y": 338
        }, "decreaseBet": {
          "x": 75,
          "y": 338
        }, "increaseBet": {
          "x": 115,
          "y": 338
        }
      }
    }
  },
  "fields": {
    "lines": {
      "font": "12px Helvetica",
      "color": "#000000",
      "x": 37,
      "y": 350
    },
    "bet": {
      "font": "12px Helvetica",
      "color": "#000000",
      "x": 102,
      "y": 350
    },
    "totalBet": {
      "font": "12px Helvetica",
      "color": "#000000",
      "x": 172,
      "y": 350
    },
    "win": {
      "font": "12px Helvetica",
      "color": "#000000",
      "x": 360,
      "y": 350
    },
    "balance": {
      "font": "12px Helvetica",
      "color": "#000000",
      "x": 448,
      "y": 350
    }
  },
  "symbols": {
    "src": "/images/symbols_sheet.png",
    "width": 100,
    "height": 100
  },
  "reel": {
    "width": 100,
    "height": 300,
    "regX": 0,
    "regY": 0,
    "spinDuration": 0.4,
    "spinDelay": 0.5,
    "speed": 2000
  },
  "payouts": [
    {
      "symbol": 0,
      "probability": 5,
      "wins": [30, 125, 400]
    },
    {
      "symbol": 1,
      "probability": 5,
      "wins": [20, 100, 300]
    },
    {
      "symbol": 2,
      "probability": 5,
      "wins": [15, 75, 200]
    },
    {
      "symbol": 3,
      "probability": 5,
      "wins": [10, 50, 150]
    },
    {
      "symbol": 4,
      "probability": 5,
      "wins": [5, 20, 100]
    },
    {
      "symbol": 5,
      "probability": 5,
      "wins": [5, 20, 100]
    },
    {
      "symbol": 6,
      "probability": 5,
      "wins": [5, 20, 100]
    },
    {
      "symbol": 7,
      "probability": 5,
      "wins": [5, 20, 100]
    },
    {
      "symbol": 8,
      "probability": 1,
      "wins": [40, 200, 750]
    },
    {
      "symbol": 9,
      "probability": 1,
      "wins": [50, 300, 1000]
    }
  ],
  "lines": [
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0],
    [2, 1, 0, 1, 2],
    [0, 1, 2, 1, 0],
    [0, 0, 1, 0, 0],
    [2, 2, 1, 2, 2],
    [1, 2, 2, 2, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [2, 1, 1, 1, 2],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [1, 0, 1, 0, 1],
    [1, 2, 1, 2, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 2, 1, 1],
    [0, 2, 0, 2, 0],
    [2, 0, 2, 0, 2],
    [1, 0, 2, 0, 1],
    [1, 2, 0, 2, 1],
    [0, 0, 2, 0, 0],
    [2, 2, 0, 2, 2],
    [0, 2, 2, 2, 0],
    [2, 0, 0, 0, 2],
    [0, 2, 1, 2, 0],
    [2, 0, 1, 0, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 1, 2, 1]
  ]
});
})(window.Slots || {});
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(Slots) {
  "use strict";
  var _ref,
    _this = this;
  Slots.load = function() {
    var $canvas, manifest;
    if (!Slots.config) {
      return;
    }
    $canvas = $('canvas');
    $canvas.attr({
      width: Slots.config.width,
      height: Slots.config.height
    });
    $canvas.on('mousedown', function() {
      return false;
    });
    this.stage = new createjs.Stage($canvas[0]);
    manifest = [
      {
        id: 'bg',
        src: Slots.config.background
      }, {
        id: 'symbols',
        src: Slots.config.symbols.src
      }, {
        id: 'buttons',
        src: Slots.config.buttons.src
      }
    ];
    this.loader = new createjs.LoadQueue(false);
    this.loader.on('complete', this.init);
    return this.loader.loadManifest(manifest);
  };
  Slots.init = function() {
    Slots.user = new Slots.User(Slots.config.user);
    return Slots.user.fetch().done(function() {
      Slots.symbolBuilder = new Slots.SymbolBuilder;
      Slots.lineBuilder = new Slots.LineBuilder;
      Slots.state = new Slots.State;
      createjs.Ticker.timingMod = createjs.Ticker.RAF_SYNCHED;
      createjs.Ticker.setFPS(Slots.config.targetFPS);
      return createjs.Ticker.on('tick', Slots.state.tick);
    });
  };
  Slots.User = (function(_super) {
    __extends(User, _super);

    function User() {
      _ref = User.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    User.prototype.urlRoot = '/api/users';

    User.prototype.spin = function(wager) {
      var dfr,
        _this = this;
      dfr = $.Deferred();
      $.post("" + (this.url()) + "/spin", wager).success(function(results) {
        _this.set('credits', results.credits);
        return dfr.resolve(results);
      });
      return dfr.promise();
    };

    return User;

  })(Backbone.Model);
  Slots.State = (function() {
    function State(opts) {
      var _this = this;
      if (opts == null) {
        opts = {};
      }
      this.tick = __bind(this.tick, this);
      this.handleSpinResults = __bind(this.handleSpinResults, this);
      this.spin = __bind(this.spin, this);
      this.lines = [];
      this.totalLines = opts.totalLines || Slots.config.lines.length;
      this.linesBet = this.totalLines;
      this.bet = 1;
      this.initBG();
      this.initReels();
      this.initSpinButton();
      this.initFieldButtons();
      this.initFieldValues();
      this.initReqCredits();
      $(document.body).on('keypress', function(evt) {
        if (evt.charCode === 32) {
          return _this.spin();
        }
      });
    }

    State.prototype.initBG = function() {
      var bg;
      bg = new createjs.Shape();
      bg.graphics.beginBitmapFill(Slots.loader.getResult("bg")).drawRect(0, 0, Slots.config.width, Slots.config.height);
      return Slots.stage.addChild(bg);
    };

    State.prototype.initReels = function() {
      var i, _i;
      this.reels = [];
      for (i = _i = 0; _i <= 4; i = ++_i) {
        this.reels[i] = new Slots.Reel({
          position: i
        });
      }
    };

    State.prototype.initSpinButton = function() {
      var config, image, sheet, _i, _j, _ref1, _ref2, _results, _results1;
      config = Slots.config.buttons.spin;
      image = Slots.loader.getResult('buttons');
      sheet = new createjs.SpriteSheet({
        images: [image],
        frames: {
          width: config.sheet.width,
          height: config.sheet.height,
          count: config.sheet.frames
        },
        animations: {
          "static": 0,
          flash: {
            frames: (function() {
              _results1 = [];
              for (var _j = 0, _ref2 = config.sheet.frames - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; 0 <= _ref2 ? _j++ : _j--){ _results1.push(_j); }
              return _results1;
            }).apply(this).concat((function() {
              _results = [];
              for (var _i = _ref1 = config.sheet.frames - 2; _ref1 <= 1 ? _i <= 1 : _i >= 1; _ref1 <= 1 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this))
          }
        }
      });
      this.spinButton = new createjs.Sprite(sheet, 'static');
      this.spinButton.framerate = 30;
      this.spinButton.width = config.sheet.width;
      this.spinButton.height = config.sheet.height;
      this.spinButton.x = config.position.x;
      this.spinButton.y = config.position.y;
      this.spinButton.on('click', this.spin);
      return Slots.stage.addChild(this.spinButton);
    };

    State.prototype.initFieldButtons = function() {
      var config, downSheet, downSheetFrames, downSprite, frameCount, image, upSheet, upSheetFrames, upSprite, _i, _j, _ref1, _ref2,
        _this = this;
      config = Slots.config.buttons.arrows;
      image = Slots.loader.getResult('buttons');
      downSheetFrames = [];
      for (frameCount = _i = 0, _ref1 = config.sheets.down.frames; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; frameCount = 0 <= _ref1 ? ++_i : --_i) {
        downSheetFrames.push([config.sheets.down.x + (frameCount * config.sheets.down.width), config.sheets.down.y, config.sheets.down.width, config.sheets.down.height, 0]);
      }
      upSheetFrames = [];
      for (frameCount = _j = 0, _ref2 = config.sheets.up.frames; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; frameCount = 0 <= _ref2 ? ++_j : --_j) {
        upSheetFrames.push([config.sheets.up.x + (frameCount * config.sheets.up.width), config.sheets.up.y, config.sheets.up.width, config.sheets.up.height, 0]);
      }
      downSheet = new createjs.SpriteSheet({
        images: [image],
        frames: downSheetFrames,
        animations: {
          "default": 0,
          clicked: [1, config.sheets.down.frames - 1, 'default', 0.5]
        }
      });
      upSheet = new createjs.SpriteSheet({
        images: [image],
        frames: upSheetFrames,
        animations: {
          "default": 0,
          clicked: [1, config.sheets.up.frames - 1, 'default', 0.5]
        }
      });
      downSprite = new createjs.Sprite(downSheet, 'default');
      downSprite.width = config.sheets.down.width;
      downSprite.height = config.sheets.down.height;
      upSprite = new createjs.Sprite(upSheet, 'default');
      upSprite.width = config.sheets.up.width;
      upSprite.height = config.sheets.up.height;
      this.decreaseLinesButton = downSprite.clone();
      _.extend(this.decreaseLinesButton, {
        x: config.positions.decreaseLines.x,
        y: config.positions.decreaseLines.y
      });
      this.decreaseLinesButton.addEventListener('click', function(evt) {
        evt.target.gotoAndPlay('clicked');
        return _this.decrementLines();
      });
      this.decreaseBetButton = downSprite.clone();
      _.extend(this.decreaseBetButton, {
        x: config.positions.decreaseBet.x,
        y: config.positions.decreaseBet.y
      });
      this.decreaseBetButton.addEventListener('click', function(evt) {
        evt.target.gotoAndPlay('clicked');
        return _this.decrementBet();
      });
      this.increaseLinesButton = upSprite.clone();
      _.extend(this.increaseLinesButton, {
        x: config.positions.increaseLines.x,
        y: config.positions.increaseLines.y
      });
      this.increaseLinesButton.addEventListener('click', function(evt) {
        evt.target.gotoAndPlay('clicked');
        return _this.incrementLines();
      });
      this.increaseBetButton = upSprite.clone();
      _.extend(this.increaseBetButton, {
        x: config.positions.increaseBet.x,
        y: config.positions.increaseBet.y
      });
      this.increaseBetButton.addEventListener('click', function(evt) {
        evt.target.gotoAndPlay('clicked');
        return _this.incrementBet();
      });
      Slots.stage.addChild(this.decreaseLinesButton);
      Slots.stage.addChild(this.decreaseBetButton);
      Slots.stage.addChild(this.increaseLinesButton);
      return Slots.stage.addChild(this.increaseBetButton);
    };

    State.prototype.initFieldValues = function() {
      var attrs, config;
      config = Slots.config.fields;
      attrs = {
        textAlign: 'center',
        textBaseline: 'middle'
      };
      this.linesField = new createjs.Text(this.linesBet, config.lines.font, config.lines.color);
      _.extend(this.linesField, attrs, {
        x: config.lines.x,
        y: config.lines.y
      });
      this.betField = new createjs.Text(this.bet, config.bet.font, config.bet.color);
      _.extend(this.betField, attrs, {
        x: config.bet.x,
        y: config.bet.y
      });
      this.totalBetField = new createjs.Text(this.linesBet * this.bet, config.lines.font, config.totalBet.color);
      _.extend(this.totalBetField, attrs, {
        x: config.totalBet.x,
        y: config.totalBet.y
      });
      this.winField = new createjs.Text(0, config.win.font, config.win.color);
      _.extend(this.winField, attrs, {
        x: config.win.x,
        y: config.win.y
      });
      this.balanceField = new createjs.Text(Slots.user.get('credits'), config.balance.font, config.balance.color);
      _.extend(this.balanceField, attrs, {
        x: config.balance.x,
        y: config.balance.y
      });
      Slots.stage.addChild(this.linesField);
      Slots.stage.addChild(this.betField);
      Slots.stage.addChild(this.totalBetField);
      Slots.stage.addChild(this.winField);
      return Slots.stage.addChild(this.balanceField);
    };

    State.prototype.initReqCredits = function() {
      var _this = this;
      return $('#request-credits').on('click', function(ev) {
        ev.preventDefault();
        return _this.updateCredits(100, true);
      });
    };

    State.prototype.incrementLines = function() {
      if (this.spinningReelCount > 0) {
        return;
      }
      if (this.linesBet < this.totalLines) {
        this.linesBet++;
      }
      this.linesField.text = this.linesBet;
      this.totalBetField.text = this.linesBet * this.bet;
      return Slots.stage.update();
    };

    State.prototype.decrementLines = function() {
      if (this.spinningReelCount > 0) {
        return;
      }
      if (this.linesBet > 1) {
        this.linesBet--;
      }
      this.linesField.text = this.linesBet;
      this.totalBetField.text = this.linesBet * this.bet;
      return Slots.stage.update();
    };

    State.prototype.incrementBet = function() {
      if (this.spinningReelCount > 0) {
        return;
      }
      this.bet++;
      this.betField.text = this.bet;
      this.totalBetField.text = this.linesBet * this.bet;
      return Slots.stage.update();
    };

    State.prototype.decrementBet = function() {
      if (this.spinningReelCount > 0) {
        return;
      }
      if (this.bet > 1) {
        this.bet--;
      }
      this.betField.text = this.bet;
      this.totalBetField.text = this.linesBet * this.bet;
      return Slots.stage.update();
    };

    State.prototype.updateWin = function(win) {
      this.winField.text = win;
      return Slots.stage.update();
    };

    State.prototype.updateCredits = function(addCredits, save) {
      var credits;
      if (addCredits == null) {
        addCredits = 0;
      }
      credits = Slots.user.get('credits') + addCredits;
      if (save) {
        Slots.user.set('credits', credits).save();
      }
      this.balanceField.text = credits;
      return Slots.stage.update();
    };

    State.prototype.spin = function() {
      var line, reel, _i, _j, _len, _len1, _ref1, _ref2;
      if (this.spinningReelCount > 0) {
        return;
      }
      while (Slots.user.get('credits') < this.linesBet * this.bet) {
        if (this.bet > 1) {
          this.decrementBet();
        } else if (this.linesBet > 1) {
          this.decrementLines();
        } else {
          return this.openInsufficientCreditsDialog();
        }
      }
      _ref1 = this.lines;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        Slots.stage.removeChild(line);
      }
      this.spinningReelCount = 5;
      _ref2 = this.reels;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        reel = _ref2[_j];
        reel.startSpin();
      }
      this.spinButton.gotoAndPlay('flash');
      this.updateWin(0);
      this.updateCredits(-this.linesBet * this.bet);
      return Slots.user.spin({
        lines: this.linesBet,
        bet: this.bet
      }).done(this.handleSpinResults);
    };

    State.prototype.openInsufficientCreditsDialog = function() {
      return alert("You're done.");
    };

    State.prototype.handleSpinResults = function(results) {
      var i, reel, _i, _len, _ref1,
        _this = this;
      _ref1 = this.reels;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        reel = _ref1[i];
        reel.completeSpin({
          values: results.values[i]
        }).done(function() {
          return _this.completeSpin(results);
        });
      }
    };

    State.prototype.completeSpin = function(results) {
      var flash, line, match, reelI, symbols, win, _i, _j, _len, _len1, _ref1, _ref2;
      this.spinningReelCount--;
      if (this.spinningReelCount !== 0) {
        return;
      }
      this.spinButton.gotoAndPlay('static');
      if (results.wins.length > 0) {
        this.lines = [];
        flash = {};
        _ref1 = results.wins;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          win = _ref1[_i];
          _ref2 = win.matches;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            match = _ref2[_j];
            if (!flash[match.position[0]]) {
              flash[match.position[0]] = {};
            }
            flash[match.position[0]][match.position[1]] = 1;
          }
          line = Slots.lineBuilder.newLine(win.line);
          this.lines.push(line);
          Slots.stage.addChild(line);
        }
        for (reelI in flash) {
          symbols = flash[reelI];
          this.reels[reelI].flash(symbols);
        }
      }
      this.updateWin(results.reward);
      return this.updateCredits();
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
      var config, i, mask, symbol, _i;
      config = {};
      _.extend(config, Slots.config.reel, opts);
      this.spinDuration = config.spinDuration;
      this.spinDelay = config.spinDelay;
      this.position = config.position;
      this.speed = config.speed;
      this.container = new createjs.Container;
      this.container.y = config.regY;
      this.container.x = config.position * config.width + config.regX;
      this.container.width = config.width;
      this.container.height = config.height;
      this.container.name = "reel" + this.position;
      mask = new createjs.Shape;
      mask.x = this.container.x;
      mask.y = this.container.y;
      mask.graphics.drawRect(0, 0, this.container.width, this.container.height);
      this.container.mask = mask;
      for (i = _i = 0; _i <= 3; i = ++_i) {
        symbol = Slots.symbolBuilder.newSprite();
        symbol.y = symbol.height * i;
        this.container.addChild(symbol);
      }
      this.render();
    }

    Reel.prototype.render = function() {
      return Slots.stage.addChild(this.container);
    };

    Reel.prototype.flash = function(symbols) {
      var symbolI;
      for (symbolI in symbols) {
        this.container.getChildAt(symbolI).gotoAndPlay('flash');
      }
    };

    Reel.prototype.startSpin = function() {
      this.values = null;
      this.isSpinning = true;
      this.isFinalPass = false;
      this.timeSpinning = 0;
      return this.defer = $.Deferred();
    };

    Reel.prototype.completeSpin = function(opts) {
      this.values = opts.values.concat(Math.floor(Math.random() * this.numSymbols));
      if (this.timeSpinning > this.spinDuration) {
        this.timeSpinning = this.spinDuration;
      }
      this.timeSpinning -= this.spinDelay * this.position;
      return this.defer.promise();
    };

    Reel.prototype.update = function(deltaS) {
      var deltaPixels, i, lastSymbol, symbol, threshhold, top, _i, _len, _ref1;
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
          this.defer.resolve();
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
      _ref1 = this.container.children;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        symbol = _ref1[i];
        symbol.y = top + (i * symbol.height);
      }
    };

    return Reel;

  })();
  Slots.LineBuilder = (function() {
    function LineBuilder(opts) {
      var graphic, i, line, lines, regX, regY, symbolHeight, symbolWidth, width, x, y, _i, _j, _len, _len1;
      if (opts == null) {
        opts = {};
      }
      this.graphics = [];
      regX = opts.regX || Slots.config.reel.regX;
      regY = opts.regX || Slots.config.reel.regY;
      width = opts.width || Slots.config.reel.width * 5;
      symbolWidth = opts.symbolWidth || Slots.config.symbols.width;
      symbolHeight = opts.symbolHeight || Slots.config.symbols.height;
      lines = opts.lines || Slots.config.lines;
      for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
        line = lines[i];
        graphic = new createjs.Graphics;
        graphic.setStrokeStyle(5).beginStroke("hsl(" + (i * 360 / lines.length) + ", 80%, 50%)");
        graphic.moveTo(0 + regX, line[0] * symbolHeight + 50 + regY);
        for (x = _j = 0, _len1 = line.length; _j < _len1; x = ++_j) {
          y = line[x];
          x = x * symbolWidth + 50 + regX;
          y = y * symbolHeight + 50 + regY;
          graphic.lineTo(x, y);
        }
        graphic.lineTo(width, y);
        this.graphics.push(graphic);
      }
    }

    LineBuilder.prototype.newLine = function(ord) {
      return new createjs.Shape(this.graphics[ord]);
    };

    return LineBuilder;

  })();
  Slots.SymbolBuilder = (function() {
    function SymbolBuilder(opts) {
      var config;
      config = {};
      _.extend(config, Slots.config.symbols, opts);
      this.image = config.image || Slots.loader.getResult('symbols');
      this.width = config.width;
      this.height = config.height;
      this.numSymbols = Math.floor(this.image.height / this.height);
      this.numFramesPerSymbol = Math.floor(this.image.width / this.width);
    }

    SymbolBuilder.prototype.newSprite = function(value) {
      var firstFrame, lastFrame, sheet, sprite, _i, _j, _ref1, _ref2, _results, _results1;
      if (value == null) {
        value = Math.floor(Math.random() * this.numSymbols);
      }
      firstFrame = value * this.numFramesPerSymbol;
      lastFrame = (value + 1) * this.numFramesPerSymbol - 1;
      sheet = new createjs.SpriteSheet({
        images: [this.image],
        frames: {
          width: this.width,
          height: this.height,
          count: this.numSymbols * this.numFramesPerSymbol
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
              for (var _i = _ref1 = lastFrame - 1, _ref2 = firstFrame + 1; _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref1 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this))
          }
        }
      });
      sprite = new createjs.Sprite(sheet, 'static');
      sprite.framerate = 30;
      sprite.width = this.width;
      sprite.height = this.height;
      return sprite;
    };

    return SymbolBuilder;

  })();
  return $(Slots.load());
})(window.Slots || {});
