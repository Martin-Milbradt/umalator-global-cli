var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../uma-tools/node_modules/immutable/dist/immutable.js
var require_immutable = __commonJS({
  "../uma-tools/node_modules/immutable/dist/immutable.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Immutable = {}));
    })(exports2, function(exports3) {
      "use strict";
      var DELETE = "delete";
      var SHIFT = 5;
      var SIZE = 1 << SHIFT;
      var MASK = SIZE - 1;
      var NOT_SET = {};
      function MakeRef() {
        return { value: false };
      }
      function SetRef(ref) {
        if (ref) {
          ref.value = true;
        }
      }
      function OwnerID() {
      }
      function ensureSize(iter) {
        if (iter.size === void 0) {
          iter.size = iter.__iterate(returnTrue);
        }
        return iter.size;
      }
      function wrapIndex(iter, index) {
        if (typeof index !== "number") {
          var uint32Index = index >>> 0;
          if ("" + uint32Index !== index || uint32Index === 4294967295) {
            return NaN;
          }
          index = uint32Index;
        }
        return index < 0 ? ensureSize(iter) + index : index;
      }
      function returnTrue() {
        return true;
      }
      function wholeSlice(begin, end, size) {
        return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
      }
      function resolveBegin(begin, size) {
        return resolveIndex(begin, size, 0);
      }
      function resolveEnd(end, size) {
        return resolveIndex(end, size, size);
      }
      function resolveIndex(index, size, defaultIndex) {
        return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
      }
      function isNeg(value) {
        return value < 0 || value === 0 && 1 / value === -Infinity;
      }
      var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
      function isCollection(maybeCollection) {
        return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
      }
      var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
      function isKeyed(maybeKeyed) {
        return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
      }
      var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
      function isIndexed(maybeIndexed) {
        return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
      }
      function isAssociative(maybeAssociative) {
        return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
      }
      var Collection = function Collection2(value) {
        return isCollection(value) ? value : Seq(value);
      };
      var KeyedCollection = /* @__PURE__ */ function(Collection2) {
        function KeyedCollection2(value) {
          return isKeyed(value) ? value : KeyedSeq(value);
        }
        if (Collection2)
          KeyedCollection2.__proto__ = Collection2;
        KeyedCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
        KeyedCollection2.prototype.constructor = KeyedCollection2;
        return KeyedCollection2;
      }(Collection);
      var IndexedCollection = /* @__PURE__ */ function(Collection2) {
        function IndexedCollection2(value) {
          return isIndexed(value) ? value : IndexedSeq(value);
        }
        if (Collection2)
          IndexedCollection2.__proto__ = Collection2;
        IndexedCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
        IndexedCollection2.prototype.constructor = IndexedCollection2;
        return IndexedCollection2;
      }(Collection);
      var SetCollection = /* @__PURE__ */ function(Collection2) {
        function SetCollection2(value) {
          return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
        }
        if (Collection2)
          SetCollection2.__proto__ = Collection2;
        SetCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
        SetCollection2.prototype.constructor = SetCollection2;
        return SetCollection2;
      }(Collection);
      Collection.Keyed = KeyedCollection;
      Collection.Indexed = IndexedCollection;
      Collection.Set = SetCollection;
      var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
      function isSeq(maybeSeq) {
        return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
      }
      var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
      function isRecord(maybeRecord) {
        return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
      }
      function isImmutable(maybeImmutable) {
        return isCollection(maybeImmutable) || isRecord(maybeImmutable);
      }
      var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
      function isOrdered(maybeOrdered) {
        return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
      }
      var ITERATE_KEYS = 0;
      var ITERATE_VALUES = 1;
      var ITERATE_ENTRIES = 2;
      var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
      var Iterator = function Iterator2(next) {
        this.next = next;
      };
      Iterator.prototype.toString = function toString2() {
        return "[Iterator]";
      };
      Iterator.KEYS = ITERATE_KEYS;
      Iterator.VALUES = ITERATE_VALUES;
      Iterator.ENTRIES = ITERATE_ENTRIES;
      Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
        return this.toString();
      };
      Iterator.prototype[ITERATOR_SYMBOL] = function() {
        return this;
      };
      function iteratorValue(type, k, v, iteratorResult) {
        var value = type === 0 ? k : type === 1 ? v : [k, v];
        iteratorResult ? iteratorResult.value = value : iteratorResult = {
          value,
          done: false
        };
        return iteratorResult;
      }
      function iteratorDone() {
        return { value: void 0, done: true };
      }
      function hasIterator(maybeIterable) {
        if (Array.isArray(maybeIterable)) {
          return true;
        }
        return !!getIteratorFn(maybeIterable);
      }
      function isIterator(maybeIterator) {
        return maybeIterator && typeof maybeIterator.next === "function";
      }
      function getIterator(iterable) {
        var iteratorFn = getIteratorFn(iterable);
        return iteratorFn && iteratorFn.call(iterable);
      }
      function getIteratorFn(iterable) {
        var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      function isEntriesIterable(maybeIterable) {
        var iteratorFn = getIteratorFn(maybeIterable);
        return iteratorFn && iteratorFn === maybeIterable.entries;
      }
      function isKeysIterable(maybeIterable) {
        var iteratorFn = getIteratorFn(maybeIterable);
        return iteratorFn && iteratorFn === maybeIterable.keys;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function isArrayLike(value) {
        if (Array.isArray(value) || typeof value === "string") {
          return true;
        }
        return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? (
          // Only {length: 0} is considered Array-like.
          Object.keys(value).length === 1
        ) : (
          // An object is only Array-like if it has a property where the last value
          // in the array-like may be found (which could be undefined).
          value.hasOwnProperty(value.length - 1)
        ));
      }
      var Seq = /* @__PURE__ */ function(Collection2) {
        function Seq2(value) {
          return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
        }
        if (Collection2)
          Seq2.__proto__ = Collection2;
        Seq2.prototype = Object.create(Collection2 && Collection2.prototype);
        Seq2.prototype.constructor = Seq2;
        Seq2.prototype.toSeq = function toSeq() {
          return this;
        };
        Seq2.prototype.toString = function toString2() {
          return this.__toString("Seq {", "}");
        };
        Seq2.prototype.cacheResult = function cacheResult() {
          if (!this._cache && this.__iterateUncached) {
            this._cache = this.entrySeq().toArray();
            this.size = this._cache.length;
          }
          return this;
        };
        Seq2.prototype.__iterate = function __iterate(fn, reverse) {
          var cache = this._cache;
          if (cache) {
            var size = cache.length;
            var i = 0;
            while (i !== size) {
              var entry = cache[reverse ? size - ++i : i++];
              if (fn(entry[1], entry[0], this) === false) {
                break;
              }
            }
            return i;
          }
          return this.__iterateUncached(fn, reverse);
        };
        Seq2.prototype.__iterator = function __iterator(type, reverse) {
          var cache = this._cache;
          if (cache) {
            var size = cache.length;
            var i = 0;
            return new Iterator(function() {
              if (i === size) {
                return iteratorDone();
              }
              var entry = cache[reverse ? size - ++i : i++];
              return iteratorValue(type, entry[0], entry[1]);
            });
          }
          return this.__iteratorUncached(type, reverse);
        };
        return Seq2;
      }(Collection);
      var KeyedSeq = /* @__PURE__ */ function(Seq2) {
        function KeyedSeq2(value) {
          return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
        }
        if (Seq2)
          KeyedSeq2.__proto__ = Seq2;
        KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
        KeyedSeq2.prototype.constructor = KeyedSeq2;
        KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq() {
          return this;
        };
        return KeyedSeq2;
      }(Seq);
      var IndexedSeq = /* @__PURE__ */ function(Seq2) {
        function IndexedSeq2(value) {
          return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
        }
        if (Seq2)
          IndexedSeq2.__proto__ = Seq2;
        IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
        IndexedSeq2.prototype.constructor = IndexedSeq2;
        IndexedSeq2.of = function of() {
          return IndexedSeq2(arguments);
        };
        IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq() {
          return this;
        };
        IndexedSeq2.prototype.toString = function toString2() {
          return this.__toString("Seq [", "]");
        };
        return IndexedSeq2;
      }(Seq);
      var SetSeq = /* @__PURE__ */ function(Seq2) {
        function SetSeq2(value) {
          return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
        }
        if (Seq2)
          SetSeq2.__proto__ = Seq2;
        SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
        SetSeq2.prototype.constructor = SetSeq2;
        SetSeq2.of = function of() {
          return SetSeq2(arguments);
        };
        SetSeq2.prototype.toSetSeq = function toSetSeq() {
          return this;
        };
        return SetSeq2;
      }(Seq);
      Seq.isSeq = isSeq;
      Seq.Keyed = KeyedSeq;
      Seq.Set = SetSeq;
      Seq.Indexed = IndexedSeq;
      Seq.prototype[IS_SEQ_SYMBOL] = true;
      var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
        function ArraySeq2(array) {
          this._array = array;
          this.size = array.length;
        }
        if (IndexedSeq2)
          ArraySeq2.__proto__ = IndexedSeq2;
        ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        ArraySeq2.prototype.constructor = ArraySeq2;
        ArraySeq2.prototype.get = function get2(index, notSetValue) {
          return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
        };
        ArraySeq2.prototype.__iterate = function __iterate(fn, reverse) {
          var array = this._array;
          var size = array.length;
          var i = 0;
          while (i !== size) {
            var ii = reverse ? size - ++i : i++;
            if (fn(array[ii], ii, this) === false) {
              break;
            }
          }
          return i;
        };
        ArraySeq2.prototype.__iterator = function __iterator(type, reverse) {
          var array = this._array;
          var size = array.length;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var ii = reverse ? size - ++i : i++;
            return iteratorValue(type, ii, array[ii]);
          });
        };
        return ArraySeq2;
      }(IndexedSeq);
      var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
        function ObjectSeq2(object) {
          var keys = Object.keys(object).concat(
            Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []
          );
          this._object = object;
          this._keys = keys;
          this.size = keys.length;
        }
        if (KeyedSeq2)
          ObjectSeq2.__proto__ = KeyedSeq2;
        ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
        ObjectSeq2.prototype.constructor = ObjectSeq2;
        ObjectSeq2.prototype.get = function get2(key, notSetValue) {
          if (notSetValue !== void 0 && !this.has(key)) {
            return notSetValue;
          }
          return this._object[key];
        };
        ObjectSeq2.prototype.has = function has2(key) {
          return hasOwnProperty.call(this._object, key);
        };
        ObjectSeq2.prototype.__iterate = function __iterate(fn, reverse) {
          var object = this._object;
          var keys = this._keys;
          var size = keys.length;
          var i = 0;
          while (i !== size) {
            var key = keys[reverse ? size - ++i : i++];
            if (fn(object[key], key, this) === false) {
              break;
            }
          }
          return i;
        };
        ObjectSeq2.prototype.__iterator = function __iterator(type, reverse) {
          var object = this._object;
          var keys = this._keys;
          var size = keys.length;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var key = keys[reverse ? size - ++i : i++];
            return iteratorValue(type, key, object[key]);
          });
        };
        return ObjectSeq2;
      }(KeyedSeq);
      ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
      var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
        function CollectionSeq2(collection) {
          this._collection = collection;
          this.size = collection.length || collection.size;
        }
        if (IndexedSeq2)
          CollectionSeq2.__proto__ = IndexedSeq2;
        CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        CollectionSeq2.prototype.constructor = CollectionSeq2;
        CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse) {
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var collection = this._collection;
          var iterator = getIterator(collection);
          var iterations = 0;
          if (isIterator(iterator)) {
            var step;
            while (!(step = iterator.next()).done) {
              if (fn(step.value, iterations++, this) === false) {
                break;
              }
            }
          }
          return iterations;
        };
        CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse) {
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var collection = this._collection;
          var iterator = getIterator(collection);
          if (!isIterator(iterator)) {
            return new Iterator(iteratorDone);
          }
          var iterations = 0;
          return new Iterator(function() {
            var step = iterator.next();
            return step.done ? step : iteratorValue(type, iterations++, step.value);
          });
        };
        return CollectionSeq2;
      }(IndexedSeq);
      var EMPTY_SEQ;
      function emptySequence() {
        return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
      }
      function keyedSeqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (seq) {
          return seq.fromEntrySeq();
        }
        if (typeof value === "object") {
          return new ObjectSeq(value);
        }
        throw new TypeError(
          "Expected Array or collection object of [k, v] entries, or keyed object: " + value
        );
      }
      function indexedSeqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (seq) {
          return seq;
        }
        throw new TypeError(
          "Expected Array or collection object of values: " + value
        );
      }
      function seqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (seq) {
          return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
        }
        if (typeof value === "object") {
          return new ObjectSeq(value);
        }
        throw new TypeError(
          "Expected Array or collection object of values, or keyed object: " + value
        );
      }
      function maybeIndexedSeqFromValue(value) {
        return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
      }
      var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
      function isMap(maybeMap) {
        return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
      }
      function isOrderedMap(maybeOrderedMap) {
        return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
      }
      function isValueObject(maybeValue) {
        return Boolean(
          maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function"
        );
      }
      function is(valueA, valueB) {
        if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
          return true;
        }
        if (!valueA || !valueB) {
          return false;
        }
        if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
          valueA = valueA.valueOf();
          valueB = valueB.valueOf();
          if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
            return true;
          }
          if (!valueA || !valueB) {
            return false;
          }
        }
        return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
      }
      var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
        a |= 0;
        b |= 0;
        var c = a & 65535;
        var d = b & 65535;
        return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
      };
      function smi(i32) {
        return i32 >>> 1 & 1073741824 | i32 & 3221225471;
      }
      var defaultValueOf = Object.prototype.valueOf;
      function hash(o) {
        if (o == null) {
          return hashNullish(o);
        }
        if (typeof o.hashCode === "function") {
          return smi(o.hashCode(o));
        }
        var v = valueOf(o);
        if (v == null) {
          return hashNullish(v);
        }
        switch (typeof v) {
          case "boolean":
            return v ? 1108378657 : 1108378656;
          case "number":
            return hashNumber(v);
          case "string":
            return v.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v) : hashString(v);
          case "object":
          case "function":
            return hashJSObj(v);
          case "symbol":
            return hashSymbol(v);
          default:
            if (typeof v.toString === "function") {
              return hashString(v.toString());
            }
            throw new Error("Value type " + typeof v + " cannot be hashed.");
        }
      }
      function hashNullish(nullish) {
        return nullish === null ? 1108378658 : (
          /* undefined */
          1108378659
        );
      }
      function hashNumber(n) {
        if (n !== n || n === Infinity) {
          return 0;
        }
        var hash2 = n | 0;
        if (hash2 !== n) {
          hash2 ^= n * 4294967295;
        }
        while (n > 4294967295) {
          n /= 4294967295;
          hash2 ^= n;
        }
        return smi(hash2);
      }
      function cachedHashString(string) {
        var hashed = stringHashCache[string];
        if (hashed === void 0) {
          hashed = hashString(string);
          if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
            STRING_HASH_CACHE_SIZE = 0;
            stringHashCache = {};
          }
          STRING_HASH_CACHE_SIZE++;
          stringHashCache[string] = hashed;
        }
        return hashed;
      }
      function hashString(string) {
        var hashed = 0;
        for (var ii = 0; ii < string.length; ii++) {
          hashed = 31 * hashed + string.charCodeAt(ii) | 0;
        }
        return smi(hashed);
      }
      function hashSymbol(sym) {
        var hashed = symbolMap[sym];
        if (hashed !== void 0) {
          return hashed;
        }
        hashed = nextHash();
        symbolMap[sym] = hashed;
        return hashed;
      }
      function hashJSObj(obj) {
        var hashed;
        if (usingWeakMap) {
          hashed = weakMap.get(obj);
          if (hashed !== void 0) {
            return hashed;
          }
        }
        hashed = obj[UID_HASH_KEY];
        if (hashed !== void 0) {
          return hashed;
        }
        if (!canDefineProperty) {
          hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
          if (hashed !== void 0) {
            return hashed;
          }
          hashed = getIENodeHash(obj);
          if (hashed !== void 0) {
            return hashed;
          }
        }
        hashed = nextHash();
        if (usingWeakMap) {
          weakMap.set(obj, hashed);
        } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
          throw new Error("Non-extensible objects are not allowed as keys.");
        } else if (canDefineProperty) {
          Object.defineProperty(obj, UID_HASH_KEY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: hashed
          });
        } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
          obj.propertyIsEnumerable = function() {
            return this.constructor.prototype.propertyIsEnumerable.apply(
              this,
              arguments
            );
          };
          obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
        } else if (obj.nodeType !== void 0) {
          obj[UID_HASH_KEY] = hashed;
        } else {
          throw new Error("Unable to set a non-enumerable property on object.");
        }
        return hashed;
      }
      var isExtensible = Object.isExtensible;
      var canDefineProperty = function() {
        try {
          Object.defineProperty({}, "@", {});
          return true;
        } catch (e) {
          return false;
        }
      }();
      function getIENodeHash(node) {
        if (node && node.nodeType > 0) {
          switch (node.nodeType) {
            case 1:
              return node.uniqueID;
            case 9:
              return node.documentElement && node.documentElement.uniqueID;
          }
        }
      }
      function valueOf(obj) {
        return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
      }
      function nextHash() {
        var nextHash2 = ++_objHashUID;
        if (_objHashUID & 1073741824) {
          _objHashUID = 0;
        }
        return nextHash2;
      }
      var usingWeakMap = typeof WeakMap === "function";
      var weakMap;
      if (usingWeakMap) {
        weakMap = /* @__PURE__ */ new WeakMap();
      }
      var symbolMap = /* @__PURE__ */ Object.create(null);
      var _objHashUID = 0;
      var UID_HASH_KEY = "__immutablehash__";
      if (typeof Symbol === "function") {
        UID_HASH_KEY = Symbol(UID_HASH_KEY);
      }
      var STRING_HASH_CACHE_MIN_STRLEN = 16;
      var STRING_HASH_CACHE_MAX_SIZE = 255;
      var STRING_HASH_CACHE_SIZE = 0;
      var stringHashCache = {};
      var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
        function ToKeyedSequence2(indexed, useKeys) {
          this._iter = indexed;
          this._useKeys = useKeys;
          this.size = indexed.size;
        }
        if (KeyedSeq2)
          ToKeyedSequence2.__proto__ = KeyedSeq2;
        ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
        ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
        ToKeyedSequence2.prototype.get = function get2(key, notSetValue) {
          return this._iter.get(key, notSetValue);
        };
        ToKeyedSequence2.prototype.has = function has2(key) {
          return this._iter.has(key);
        };
        ToKeyedSequence2.prototype.valueSeq = function valueSeq() {
          return this._iter.valueSeq();
        };
        ToKeyedSequence2.prototype.reverse = function reverse() {
          var this$1$1 = this;
          var reversedSequence = reverseFactory(this, true);
          if (!this._useKeys) {
            reversedSequence.valueSeq = function() {
              return this$1$1._iter.toSeq().reverse();
            };
          }
          return reversedSequence;
        };
        ToKeyedSequence2.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          var mappedSequence = mapFactory(this, mapper, context);
          if (!this._useKeys) {
            mappedSequence.valueSeq = function() {
              return this$1$1._iter.toSeq().map(mapper, context);
            };
          }
          return mappedSequence;
        };
        ToKeyedSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._iter.__iterate(function(v, k) {
            return fn(v, k, this$1$1);
          }, reverse);
        };
        ToKeyedSequence2.prototype.__iterator = function __iterator(type, reverse) {
          return this._iter.__iterator(type, reverse);
        };
        return ToKeyedSequence2;
      }(KeyedSeq);
      ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
      var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
        function ToIndexedSequence2(iter) {
          this._iter = iter;
          this.size = iter.size;
        }
        if (IndexedSeq2)
          ToIndexedSequence2.__proto__ = IndexedSeq2;
        ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
        ToIndexedSequence2.prototype.includes = function includes(value) {
          return this._iter.includes(value);
        };
        ToIndexedSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          var i = 0;
          reverse && ensureSize(this);
          return this._iter.__iterate(
            function(v) {
              return fn(v, reverse ? this$1$1.size - ++i : i++, this$1$1);
            },
            reverse
          );
        };
        ToIndexedSequence2.prototype.__iterator = function __iterator(type, reverse) {
          var this$1$1 = this;
          var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
          var i = 0;
          reverse && ensureSize(this);
          return new Iterator(function() {
            var step = iterator.next();
            return step.done ? step : iteratorValue(
              type,
              reverse ? this$1$1.size - ++i : i++,
              step.value,
              step
            );
          });
        };
        return ToIndexedSequence2;
      }(IndexedSeq);
      var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
        function ToSetSequence2(iter) {
          this._iter = iter;
          this.size = iter.size;
        }
        if (SetSeq2)
          ToSetSequence2.__proto__ = SetSeq2;
        ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
        ToSetSequence2.prototype.constructor = ToSetSequence2;
        ToSetSequence2.prototype.has = function has2(key) {
          return this._iter.includes(key);
        };
        ToSetSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._iter.__iterate(function(v) {
            return fn(v, v, this$1$1);
          }, reverse);
        };
        ToSetSequence2.prototype.__iterator = function __iterator(type, reverse) {
          var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
          return new Iterator(function() {
            var step = iterator.next();
            return step.done ? step : iteratorValue(type, step.value, step.value, step);
          });
        };
        return ToSetSequence2;
      }(SetSeq);
      var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
        function FromEntriesSequence2(entries) {
          this._iter = entries;
          this.size = entries.size;
        }
        if (KeyedSeq2)
          FromEntriesSequence2.__proto__ = KeyedSeq2;
        FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
        FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
        FromEntriesSequence2.prototype.entrySeq = function entrySeq() {
          return this._iter.toSeq();
        };
        FromEntriesSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._iter.__iterate(function(entry) {
            if (entry) {
              validateEntry(entry);
              var indexedCollection = isCollection(entry);
              return fn(
                indexedCollection ? entry.get(1) : entry[1],
                indexedCollection ? entry.get(0) : entry[0],
                this$1$1
              );
            }
          }, reverse);
        };
        FromEntriesSequence2.prototype.__iterator = function __iterator(type, reverse) {
          var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
          return new Iterator(function() {
            while (true) {
              var step = iterator.next();
              if (step.done) {
                return step;
              }
              var entry = step.value;
              if (entry) {
                validateEntry(entry);
                var indexedCollection = isCollection(entry);
                return iteratorValue(
                  type,
                  indexedCollection ? entry.get(0) : entry[0],
                  indexedCollection ? entry.get(1) : entry[1],
                  step
                );
              }
            }
          });
        };
        return FromEntriesSequence2;
      }(KeyedSeq);
      ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
      function flipFactory(collection) {
        var flipSequence = makeSequence(collection);
        flipSequence._iter = collection;
        flipSequence.size = collection.size;
        flipSequence.flip = function() {
          return collection;
        };
        flipSequence.reverse = function() {
          var reversedSequence = collection.reverse.apply(this);
          reversedSequence.flip = function() {
            return collection.reverse();
          };
          return reversedSequence;
        };
        flipSequence.has = function(key) {
          return collection.includes(key);
        };
        flipSequence.includes = function(key) {
          return collection.has(key);
        };
        flipSequence.cacheResult = cacheResultThrough;
        flipSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          return collection.__iterate(function(v, k) {
            return fn(k, v, this$1$1) !== false;
          }, reverse);
        };
        flipSequence.__iteratorUncached = function(type, reverse) {
          if (type === ITERATE_ENTRIES) {
            var iterator = collection.__iterator(type, reverse);
            return new Iterator(function() {
              var step = iterator.next();
              if (!step.done) {
                var k = step.value[0];
                step.value[0] = step.value[1];
                step.value[1] = k;
              }
              return step;
            });
          }
          return collection.__iterator(
            type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
            reverse
          );
        };
        return flipSequence;
      }
      function mapFactory(collection, mapper, context) {
        var mappedSequence = makeSequence(collection);
        mappedSequence.size = collection.size;
        mappedSequence.has = function(key) {
          return collection.has(key);
        };
        mappedSequence.get = function(key, notSetValue) {
          var v = collection.get(key, NOT_SET);
          return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
        };
        mappedSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          return collection.__iterate(
            function(v, k, c) {
              return fn(mapper.call(context, v, k, c), k, this$1$1) !== false;
            },
            reverse
          );
        };
        mappedSequence.__iteratorUncached = function(type, reverse) {
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          return new Iterator(function() {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var key = entry[0];
            return iteratorValue(
              type,
              key,
              mapper.call(context, entry[1], key, collection),
              step
            );
          });
        };
        return mappedSequence;
      }
      function reverseFactory(collection, useKeys) {
        var this$1$1 = this;
        var reversedSequence = makeSequence(collection);
        reversedSequence._iter = collection;
        reversedSequence.size = collection.size;
        reversedSequence.reverse = function() {
          return collection;
        };
        if (collection.flip) {
          reversedSequence.flip = function() {
            var flipSequence = flipFactory(collection);
            flipSequence.reverse = function() {
              return collection.flip();
            };
            return flipSequence;
          };
        }
        reversedSequence.get = function(key, notSetValue) {
          return collection.get(useKeys ? key : -1 - key, notSetValue);
        };
        reversedSequence.has = function(key) {
          return collection.has(useKeys ? key : -1 - key);
        };
        reversedSequence.includes = function(value) {
          return collection.includes(value);
        };
        reversedSequence.cacheResult = cacheResultThrough;
        reversedSequence.__iterate = function(fn, reverse) {
          var this$1$12 = this;
          var i = 0;
          reverse && ensureSize(collection);
          return collection.__iterate(
            function(v, k) {
              return fn(v, useKeys ? k : reverse ? this$1$12.size - ++i : i++, this$1$12);
            },
            !reverse
          );
        };
        reversedSequence.__iterator = function(type, reverse) {
          var i = 0;
          reverse && ensureSize(collection);
          var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
          return new Iterator(function() {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            return iteratorValue(
              type,
              useKeys ? entry[0] : reverse ? this$1$1.size - ++i : i++,
              entry[1],
              step
            );
          });
        };
        return reversedSequence;
      }
      function filterFactory(collection, predicate, context, useKeys) {
        var filterSequence = makeSequence(collection);
        if (useKeys) {
          filterSequence.has = function(key) {
            var v = collection.get(key, NOT_SET);
            return v !== NOT_SET && !!predicate.call(context, v, key, collection);
          };
          filterSequence.get = function(key, notSetValue) {
            var v = collection.get(key, NOT_SET);
            return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
          };
        }
        filterSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          var iterations = 0;
          collection.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$1$1);
            }
          }, reverse);
          return iterations;
        };
        filterSequence.__iteratorUncached = function(type, reverse) {
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          var iterations = 0;
          return new Iterator(function() {
            while (true) {
              var step = iterator.next();
              if (step.done) {
                return step;
              }
              var entry = step.value;
              var key = entry[0];
              var value = entry[1];
              if (predicate.call(context, value, key, collection)) {
                return iteratorValue(type, useKeys ? key : iterations++, value, step);
              }
            }
          });
        };
        return filterSequence;
      }
      function countByFactory(collection, grouper, context) {
        var groups = Map2().asMutable();
        collection.__iterate(function(v, k) {
          groups.update(grouper.call(context, v, k, collection), 0, function(a) {
            return a + 1;
          });
        });
        return groups.asImmutable();
      }
      function groupByFactory(collection, grouper, context) {
        var isKeyedIter = isKeyed(collection);
        var groups = (isOrdered(collection) ? OrderedMap() : Map2()).asMutable();
        collection.__iterate(function(v, k) {
          groups.update(
            grouper.call(context, v, k, collection),
            function(a) {
              return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
            }
          );
        });
        var coerce = collectionClass(collection);
        return groups.map(function(arr) {
          return reify(collection, coerce(arr));
        }).asImmutable();
      }
      function partitionFactory(collection, predicate, context) {
        var isKeyedIter = isKeyed(collection);
        var groups = [[], []];
        collection.__iterate(function(v, k) {
          groups[predicate.call(context, v, k, collection) ? 1 : 0].push(
            isKeyedIter ? [k, v] : v
          );
        });
        var coerce = collectionClass(collection);
        return groups.map(function(arr) {
          return reify(collection, coerce(arr));
        });
      }
      function sliceFactory(collection, begin, end, useKeys) {
        var originalSize = collection.size;
        if (wholeSlice(begin, end, originalSize)) {
          return collection;
        }
        if (typeof originalSize === "undefined" && (begin < 0 || end < 0)) {
          return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
        }
        var resolvedBegin = resolveBegin(begin, originalSize);
        var resolvedEnd = resolveEnd(end, originalSize);
        var resolvedSize = resolvedEnd - resolvedBegin;
        var sliceSize;
        if (resolvedSize === resolvedSize) {
          sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
        }
        var sliceSeq = makeSequence(collection);
        sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
        if (!useKeys && isSeq(collection) && sliceSize >= 0) {
          sliceSeq.get = function(index, notSetValue) {
            index = wrapIndex(this, index);
            return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
          };
        }
        sliceSeq.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          if (sliceSize === 0) {
            return 0;
          }
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var skipped = 0;
          var isSkipping = true;
          var iterations = 0;
          collection.__iterate(function(v, k) {
            if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
            }
          });
          return iterations;
        };
        sliceSeq.__iteratorUncached = function(type, reverse) {
          if (sliceSize !== 0 && reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          if (sliceSize === 0) {
            return new Iterator(iteratorDone);
          }
          var iterator = collection.__iterator(type, reverse);
          var skipped = 0;
          var iterations = 0;
          return new Iterator(function() {
            while (skipped++ < resolvedBegin) {
              iterator.next();
            }
            if (++iterations > sliceSize) {
              return iteratorDone();
            }
            var step = iterator.next();
            if (useKeys || type === ITERATE_VALUES || step.done) {
              return step;
            }
            if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations - 1, void 0, step);
            }
            return iteratorValue(type, iterations - 1, step.value[1], step);
          });
        };
        return sliceSeq;
      }
      function takeWhileFactory(collection, predicate, context) {
        var takeSequence = makeSequence(collection);
        takeSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var iterations = 0;
          collection.__iterate(
            function(v, k, c) {
              return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1$1);
            }
          );
          return iterations;
        };
        takeSequence.__iteratorUncached = function(type, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          var iterating = true;
          return new Iterator(function() {
            if (!iterating) {
              return iteratorDone();
            }
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var k = entry[0];
            var v = entry[1];
            if (!predicate.call(context, v, k, this$1$1)) {
              iterating = false;
              return iteratorDone();
            }
            return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
          });
        };
        return takeSequence;
      }
      function skipWhileFactory(collection, predicate, context, useKeys) {
        var skipSequence = makeSequence(collection);
        skipSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var isSkipping = true;
          var iterations = 0;
          collection.__iterate(function(v, k, c) {
            if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$1$1);
            }
          });
          return iterations;
        };
        skipSequence.__iteratorUncached = function(type, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          var skipping = true;
          var iterations = 0;
          return new Iterator(function() {
            var step;
            var k;
            var v;
            do {
              step = iterator.next();
              if (step.done) {
                if (useKeys || type === ITERATE_VALUES) {
                  return step;
                }
                if (type === ITERATE_KEYS) {
                  return iteratorValue(type, iterations++, void 0, step);
                }
                return iteratorValue(type, iterations++, step.value[1], step);
              }
              var entry = step.value;
              k = entry[0];
              v = entry[1];
              skipping && (skipping = predicate.call(context, v, k, this$1$1));
            } while (skipping);
            return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
          });
        };
        return skipSequence;
      }
      function concatFactory(collection, values) {
        var isKeyedCollection = isKeyed(collection);
        var iters = [collection].concat(values).map(function(v) {
          if (!isCollection(v)) {
            v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
          } else if (isKeyedCollection) {
            v = KeyedCollection(v);
          }
          return v;
        }).filter(function(v) {
          return v.size !== 0;
        });
        if (iters.length === 0) {
          return collection;
        }
        if (iters.length === 1) {
          var singleton = iters[0];
          if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
            return singleton;
          }
        }
        var concatSeq = new ArraySeq(iters);
        if (isKeyedCollection) {
          concatSeq = concatSeq.toKeyedSeq();
        } else if (!isIndexed(collection)) {
          concatSeq = concatSeq.toSetSeq();
        }
        concatSeq = concatSeq.flatten(true);
        concatSeq.size = iters.reduce(function(sum, seq) {
          if (sum !== void 0) {
            var size = seq.size;
            if (size !== void 0) {
              return sum + size;
            }
          }
        }, 0);
        return concatSeq;
      }
      function flattenFactory(collection, depth, useKeys) {
        var flatSequence = makeSequence(collection);
        flatSequence.__iterateUncached = function(fn, reverse) {
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var iterations = 0;
          var stopped = false;
          function flatDeep(iter, currentDepth) {
            iter.__iterate(function(v, k) {
              if ((!depth || currentDepth < depth) && isCollection(v)) {
                flatDeep(v, currentDepth + 1);
              } else {
                iterations++;
                if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
                  stopped = true;
                }
              }
              return !stopped;
            }, reverse);
          }
          flatDeep(collection, 0);
          return iterations;
        };
        flatSequence.__iteratorUncached = function(type, reverse) {
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = collection.__iterator(type, reverse);
          var stack = [];
          var iterations = 0;
          return new Iterator(function() {
            while (iterator) {
              var step = iterator.next();
              if (step.done !== false) {
                iterator = stack.pop();
                continue;
              }
              var v = step.value;
              if (type === ITERATE_ENTRIES) {
                v = v[1];
              }
              if ((!depth || stack.length < depth) && isCollection(v)) {
                stack.push(iterator);
                iterator = v.__iterator(type, reverse);
              } else {
                return useKeys ? step : iteratorValue(type, iterations++, v, step);
              }
            }
            return iteratorDone();
          });
        };
        return flatSequence;
      }
      function flatMapFactory(collection, mapper, context) {
        var coerce = collectionClass(collection);
        return collection.toSeq().map(function(v, k) {
          return coerce(mapper.call(context, v, k, collection));
        }).flatten(true);
      }
      function interposeFactory(collection, separator) {
        var interposedSequence = makeSequence(collection);
        interposedSequence.size = collection.size && collection.size * 2 - 1;
        interposedSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          var iterations = 0;
          collection.__iterate(
            function(v) {
              return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v, iterations++, this$1$1) !== false;
            },
            reverse
          );
          return iterations;
        };
        interposedSequence.__iteratorUncached = function(type, reverse) {
          var iterator = collection.__iterator(ITERATE_VALUES, reverse);
          var iterations = 0;
          var step;
          return new Iterator(function() {
            if (!step || iterations % 2) {
              step = iterator.next();
              if (step.done) {
                return step;
              }
            }
            return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
          });
        };
        return interposedSequence;
      }
      function sortFactory(collection, comparator, mapper) {
        if (!comparator) {
          comparator = defaultComparator;
        }
        var isKeyedCollection = isKeyed(collection);
        var index = 0;
        var entries = collection.toSeq().map(function(v, k) {
          return [k, v, index++, mapper ? mapper(v, k, collection) : v];
        }).valueSeq().toArray();
        entries.sort(function(a, b) {
          return comparator(a[3], b[3]) || a[2] - b[2];
        }).forEach(
          isKeyedCollection ? function(v, i) {
            entries[i].length = 2;
          } : function(v, i) {
            entries[i] = v[1];
          }
        );
        return isKeyedCollection ? KeyedSeq(entries) : isIndexed(collection) ? IndexedSeq(entries) : SetSeq(entries);
      }
      function maxFactory(collection, comparator, mapper) {
        if (!comparator) {
          comparator = defaultComparator;
        }
        if (mapper) {
          var entry = collection.toSeq().map(function(v, k) {
            return [v, mapper(v, k, collection)];
          }).reduce(function(a, b) {
            return maxCompare(comparator, a[1], b[1]) ? b : a;
          });
          return entry && entry[0];
        }
        return collection.reduce(function(a, b) {
          return maxCompare(comparator, a, b) ? b : a;
        });
      }
      function maxCompare(comparator, a, b) {
        var comp = comparator(b, a);
        return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
      }
      function zipWithFactory(keyIter, zipper, iters, zipAll) {
        var zipSequence = makeSequence(keyIter);
        var sizes = new ArraySeq(iters).map(function(i) {
          return i.size;
        });
        zipSequence.size = zipAll ? sizes.max() : sizes.min();
        zipSequence.__iterate = function(fn, reverse) {
          var iterator = this.__iterator(ITERATE_VALUES, reverse);
          var step;
          var iterations = 0;
          while (!(step = iterator.next()).done) {
            if (fn(step.value, iterations++, this) === false) {
              break;
            }
          }
          return iterations;
        };
        zipSequence.__iteratorUncached = function(type, reverse) {
          var iterators = iters.map(
            function(i) {
              return i = Collection(i), getIterator(reverse ? i.reverse() : i);
            }
          );
          var iterations = 0;
          var isDone = false;
          return new Iterator(function() {
            var steps;
            if (!isDone) {
              steps = iterators.map(function(i) {
                return i.next();
              });
              isDone = zipAll ? steps.every(function(s) {
                return s.done;
              }) : steps.some(function(s) {
                return s.done;
              });
            }
            if (isDone) {
              return iteratorDone();
            }
            return iteratorValue(
              type,
              iterations++,
              zipper.apply(
                null,
                steps.map(function(s) {
                  return s.value;
                })
              )
            );
          });
        };
        return zipSequence;
      }
      function reify(iter, seq) {
        return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
      }
      function validateEntry(entry) {
        if (entry !== Object(entry)) {
          throw new TypeError("Expected [K, V] tuple: " + entry);
        }
      }
      function collectionClass(collection) {
        return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
      }
      function makeSequence(collection) {
        return Object.create(
          (isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype
        );
      }
      function cacheResultThrough() {
        if (this._iter.cacheResult) {
          this._iter.cacheResult();
          this.size = this._iter.size;
          return this;
        }
        return Seq.prototype.cacheResult.call(this);
      }
      function defaultComparator(a, b) {
        if (a === void 0 && b === void 0) {
          return 0;
        }
        if (a === void 0) {
          return 1;
        }
        if (b === void 0) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      }
      function arrCopy(arr, offset) {
        offset = offset || 0;
        var len = Math.max(0, arr.length - offset);
        var newArr = new Array(len);
        for (var ii = 0; ii < len; ii++) {
          newArr[ii] = arr[ii + offset];
        }
        return newArr;
      }
      function invariant(condition, error) {
        if (!condition) {
          throw new Error(error);
        }
      }
      function assertNotInfinite(size) {
        invariant(
          size !== Infinity,
          "Cannot perform this action with an infinite size."
        );
      }
      function coerceKeyPath(keyPath) {
        if (isArrayLike(keyPath) && typeof keyPath !== "string") {
          return keyPath;
        }
        if (isOrdered(keyPath)) {
          return keyPath.toArray();
        }
        throw new TypeError(
          "Invalid keyPath: expected Ordered Collection or Array: " + keyPath
        );
      }
      var toString = Object.prototype.toString;
      function isPlainObject(value) {
        if (!value || typeof value !== "object" || toString.call(value) !== "[object Object]") {
          return false;
        }
        var proto = Object.getPrototypeOf(value);
        if (proto === null) {
          return true;
        }
        var parentProto = proto;
        var nextProto = Object.getPrototypeOf(proto);
        while (nextProto !== null) {
          parentProto = nextProto;
          nextProto = Object.getPrototypeOf(parentProto);
        }
        return parentProto === proto;
      }
      function isDataStructure(value) {
        return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
      }
      function quoteString(value) {
        try {
          return typeof value === "string" ? JSON.stringify(value) : String(value);
        } catch (_ignoreError) {
          return JSON.stringify(value);
        }
      }
      function has(collection, key) {
        return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
      }
      function get(collection, key, notSetValue) {
        return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
      }
      function shallowCopy(from) {
        if (Array.isArray(from)) {
          return arrCopy(from);
        }
        var to = {};
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        return to;
      }
      function remove(collection, key) {
        if (!isDataStructure(collection)) {
          throw new TypeError(
            "Cannot update non-data-structure value: " + collection
          );
        }
        if (isImmutable(collection)) {
          if (!collection.remove) {
            throw new TypeError(
              "Cannot update immutable value without .remove() method: " + collection
            );
          }
          return collection.remove(key);
        }
        if (!hasOwnProperty.call(collection, key)) {
          return collection;
        }
        var collectionCopy = shallowCopy(collection);
        if (Array.isArray(collectionCopy)) {
          collectionCopy.splice(key, 1);
        } else {
          delete collectionCopy[key];
        }
        return collectionCopy;
      }
      function set(collection, key, value) {
        if (!isDataStructure(collection)) {
          throw new TypeError(
            "Cannot update non-data-structure value: " + collection
          );
        }
        if (isImmutable(collection)) {
          if (!collection.set) {
            throw new TypeError(
              "Cannot update immutable value without .set() method: " + collection
            );
          }
          return collection.set(key, value);
        }
        if (hasOwnProperty.call(collection, key) && value === collection[key]) {
          return collection;
        }
        var collectionCopy = shallowCopy(collection);
        collectionCopy[key] = value;
        return collectionCopy;
      }
      function updateIn$1(collection, keyPath, notSetValue, updater) {
        if (!updater) {
          updater = notSetValue;
          notSetValue = void 0;
        }
        var updatedValue = updateInDeeply(
          isImmutable(collection),
          collection,
          coerceKeyPath(keyPath),
          0,
          notSetValue,
          updater
        );
        return updatedValue === NOT_SET ? notSetValue : updatedValue;
      }
      function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
        var wasNotSet = existing === NOT_SET;
        if (i === keyPath.length) {
          var existingValue = wasNotSet ? notSetValue : existing;
          var newValue = updater(existingValue);
          return newValue === existingValue ? existing : newValue;
        }
        if (!wasNotSet && !isDataStructure(existing)) {
          throw new TypeError(
            "Cannot update within non-data-structure value in path [" + keyPath.slice(0, i).map(quoteString) + "]: " + existing
          );
        }
        var key = keyPath[i];
        var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
        var nextUpdated = updateInDeeply(
          nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
          nextExisting,
          keyPath,
          i + 1,
          notSetValue,
          updater
        );
        return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(
          wasNotSet ? inImmutable ? emptyMap() : {} : existing,
          key,
          nextUpdated
        );
      }
      function setIn$1(collection, keyPath, value) {
        return updateIn$1(collection, keyPath, NOT_SET, function() {
          return value;
        });
      }
      function setIn(keyPath, v) {
        return setIn$1(this, keyPath, v);
      }
      function removeIn(collection, keyPath) {
        return updateIn$1(collection, keyPath, function() {
          return NOT_SET;
        });
      }
      function deleteIn(keyPath) {
        return removeIn(this, keyPath);
      }
      function update$1(collection, key, notSetValue, updater) {
        return updateIn$1(collection, [key], notSetValue, updater);
      }
      function update(key, notSetValue, updater) {
        return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
      }
      function updateIn(keyPath, notSetValue, updater) {
        return updateIn$1(this, keyPath, notSetValue, updater);
      }
      function merge$1() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        return mergeIntoKeyedWith(this, iters);
      }
      function mergeWith$1(merger) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        if (typeof merger !== "function") {
          throw new TypeError("Invalid merger function: " + merger);
        }
        return mergeIntoKeyedWith(this, iters, merger);
      }
      function mergeIntoKeyedWith(collection, collections, merger) {
        var iters = [];
        for (var ii = 0; ii < collections.length; ii++) {
          var collection$1 = KeyedCollection(collections[ii]);
          if (collection$1.size !== 0) {
            iters.push(collection$1);
          }
        }
        if (iters.length === 0) {
          return collection;
        }
        if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
          return collection.constructor(iters[0]);
        }
        return collection.withMutations(function(collection2) {
          var mergeIntoCollection = merger ? function(value, key) {
            update$1(
              collection2,
              key,
              NOT_SET,
              function(oldVal) {
                return oldVal === NOT_SET ? value : merger(oldVal, value, key);
              }
            );
          } : function(value, key) {
            collection2.set(key, value);
          };
          for (var ii2 = 0; ii2 < iters.length; ii2++) {
            iters[ii2].forEach(mergeIntoCollection);
          }
        });
      }
      function merge(collection) {
        var sources = [], len = arguments.length - 1;
        while (len-- > 0)
          sources[len] = arguments[len + 1];
        return mergeWithSources(collection, sources);
      }
      function mergeWith(merger, collection) {
        var sources = [], len = arguments.length - 2;
        while (len-- > 0)
          sources[len] = arguments[len + 2];
        return mergeWithSources(collection, sources, merger);
      }
      function mergeDeep$1(collection) {
        var sources = [], len = arguments.length - 1;
        while (len-- > 0)
          sources[len] = arguments[len + 1];
        return mergeDeepWithSources(collection, sources);
      }
      function mergeDeepWith$1(merger, collection) {
        var sources = [], len = arguments.length - 2;
        while (len-- > 0)
          sources[len] = arguments[len + 2];
        return mergeDeepWithSources(collection, sources, merger);
      }
      function mergeDeepWithSources(collection, sources, merger) {
        return mergeWithSources(collection, sources, deepMergerWith(merger));
      }
      function mergeWithSources(collection, sources, merger) {
        if (!isDataStructure(collection)) {
          throw new TypeError(
            "Cannot merge into non-data-structure value: " + collection
          );
        }
        if (isImmutable(collection)) {
          return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
        }
        var isArray = Array.isArray(collection);
        var merged = collection;
        var Collection2 = isArray ? IndexedCollection : KeyedCollection;
        var mergeItem = isArray ? function(value) {
          if (merged === collection) {
            merged = shallowCopy(merged);
          }
          merged.push(value);
        } : function(value, key) {
          var hasVal = hasOwnProperty.call(merged, key);
          var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
          if (!hasVal || nextVal !== merged[key]) {
            if (merged === collection) {
              merged = shallowCopy(merged);
            }
            merged[key] = nextVal;
          }
        };
        for (var i = 0; i < sources.length; i++) {
          Collection2(sources[i]).forEach(mergeItem);
        }
        return merged;
      }
      function deepMergerWith(merger) {
        function deepMerger(oldValue, newValue, key) {
          return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
        }
        return deepMerger;
      }
      function areMergeable(oldDataStructure, newDataStructure) {
        var oldSeq = Seq(oldDataStructure);
        var newSeq = Seq(newDataStructure);
        return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
      }
      function mergeDeep() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        return mergeDeepWithSources(this, iters);
      }
      function mergeDeepWith(merger) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        return mergeDeepWithSources(this, iters, merger);
      }
      function mergeIn(keyPath) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        return updateIn$1(this, keyPath, emptyMap(), function(m) {
          return mergeWithSources(m, iters);
        });
      }
      function mergeDeepIn(keyPath) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        return updateIn$1(
          this,
          keyPath,
          emptyMap(),
          function(m) {
            return mergeDeepWithSources(m, iters);
          }
        );
      }
      function withMutations(fn) {
        var mutable = this.asMutable();
        fn(mutable);
        return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
      }
      function asMutable() {
        return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
      }
      function asImmutable() {
        return this.__ensureOwner();
      }
      function wasAltered() {
        return this.__altered;
      }
      var Map2 = /* @__PURE__ */ function(KeyedCollection2) {
        function Map3(value) {
          return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map) {
            var iter = KeyedCollection2(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v, k) {
              return map.set(k, v);
            });
          });
        }
        if (KeyedCollection2)
          Map3.__proto__ = KeyedCollection2;
        Map3.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
        Map3.prototype.constructor = Map3;
        Map3.prototype.toString = function toString2() {
          return this.__toString("Map {", "}");
        };
        Map3.prototype.get = function get2(k, notSetValue) {
          return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
        };
        Map3.prototype.set = function set2(k, v) {
          return updateMap(this, k, v);
        };
        Map3.prototype.remove = function remove2(k) {
          return updateMap(this, k, NOT_SET);
        };
        Map3.prototype.deleteAll = function deleteAll(keys) {
          var collection = Collection(keys);
          if (collection.size === 0) {
            return this;
          }
          return this.withMutations(function(map) {
            collection.forEach(function(key) {
              return map.remove(key);
            });
          });
        };
        Map3.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = 0;
            this._root = null;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return emptyMap();
        };
        Map3.prototype.sort = function sort(comparator) {
          return OrderedMap(sortFactory(this, comparator));
        };
        Map3.prototype.sortBy = function sortBy(mapper, comparator) {
          return OrderedMap(sortFactory(this, comparator, mapper));
        };
        Map3.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          return this.withMutations(function(map2) {
            map2.forEach(function(value, key) {
              map2.set(key, mapper.call(context, value, key, this$1$1));
            });
          });
        };
        Map3.prototype.__iterator = function __iterator(type, reverse) {
          return new MapIterator(this, type, reverse);
        };
        Map3.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          var iterations = 0;
          this._root && this._root.iterate(function(entry) {
            iterations++;
            return fn(entry[1], entry[0], this$1$1);
          }, reverse);
          return iterations;
        };
        Map3.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          if (!ownerID) {
            if (this.size === 0) {
              return emptyMap();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            return this;
          }
          return makeMap(this.size, this._root, ownerID, this.__hash);
        };
        return Map3;
      }(KeyedCollection);
      Map2.isMap = isMap;
      var MapPrototype = Map2.prototype;
      MapPrototype[IS_MAP_SYMBOL] = true;
      MapPrototype[DELETE] = MapPrototype.remove;
      MapPrototype.removeAll = MapPrototype.deleteAll;
      MapPrototype.setIn = setIn;
      MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
      MapPrototype.update = update;
      MapPrototype.updateIn = updateIn;
      MapPrototype.merge = MapPrototype.concat = merge$1;
      MapPrototype.mergeWith = mergeWith$1;
      MapPrototype.mergeDeep = mergeDeep;
      MapPrototype.mergeDeepWith = mergeDeepWith;
      MapPrototype.mergeIn = mergeIn;
      MapPrototype.mergeDeepIn = mergeDeepIn;
      MapPrototype.withMutations = withMutations;
      MapPrototype.wasAltered = wasAltered;
      MapPrototype.asImmutable = asImmutable;
      MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
      MapPrototype["@@transducer/step"] = function(result, arr) {
        return result.set(arr[0], arr[1]);
      };
      MapPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      var ArrayMapNode = function ArrayMapNode2(ownerID, entries) {
        this.ownerID = ownerID;
        this.entries = entries;
      };
      ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        var entries = this.entries;
        for (var ii = 0, len = entries.length; ii < len; ii++) {
          if (is(key, entries[ii][0])) {
            return entries[ii][1];
          }
        }
        return notSetValue;
      };
      ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        var removed = value === NOT_SET;
        var entries = this.entries;
        var idx = 0;
        var len = entries.length;
        for (; idx < len; idx++) {
          if (is(key, entries[idx][0])) {
            break;
          }
        }
        var exists = idx < len;
        if (exists ? entries[idx][1] === value : removed) {
          return this;
        }
        SetRef(didAlter);
        (removed || !exists) && SetRef(didChangeSize);
        if (removed && entries.length === 1) {
          return;
        }
        if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
          return createNodes(ownerID, entries, key, value);
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newEntries = isEditable ? entries : arrCopy(entries);
        if (exists) {
          if (removed) {
            idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
          } else {
            newEntries[idx] = [key, value];
          }
        } else {
          newEntries.push([key, value]);
        }
        if (isEditable) {
          this.entries = newEntries;
          return this;
        }
        return new ArrayMapNode(ownerID, newEntries);
      };
      var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
        this.ownerID = ownerID;
        this.bitmap = bitmap;
        this.nodes = nodes;
      };
      BitmapIndexedNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
        var bitmap = this.bitmap;
        return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(
          shift + SHIFT,
          keyHash,
          key,
          notSetValue
        );
      };
      BitmapIndexedNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var bit = 1 << keyHashFrag;
        var bitmap = this.bitmap;
        var exists = (bitmap & bit) !== 0;
        if (!exists && value === NOT_SET) {
          return this;
        }
        var idx = popCount(bitmap & bit - 1);
        var nodes = this.nodes;
        var node = exists ? nodes[idx] : void 0;
        var newNode = updateNode(
          node,
          ownerID,
          shift + SHIFT,
          keyHash,
          key,
          value,
          didChangeSize,
          didAlter
        );
        if (newNode === node) {
          return this;
        }
        if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
          return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
        }
        if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
          return nodes[idx ^ 1];
        }
        if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
          return newNode;
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
        var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
        if (isEditable) {
          this.bitmap = newBitmap;
          this.nodes = newNodes;
          return this;
        }
        return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
      };
      var HashArrayMapNode = function HashArrayMapNode2(ownerID, count, nodes) {
        this.ownerID = ownerID;
        this.count = count;
        this.nodes = nodes;
      };
      HashArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var node = this.nodes[idx];
        return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
      };
      HashArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var removed = value === NOT_SET;
        var nodes = this.nodes;
        var node = nodes[idx];
        if (removed && !node) {
          return this;
        }
        var newNode = updateNode(
          node,
          ownerID,
          shift + SHIFT,
          keyHash,
          key,
          value,
          didChangeSize,
          didAlter
        );
        if (newNode === node) {
          return this;
        }
        var newCount = this.count;
        if (!node) {
          newCount++;
        } else if (!newNode) {
          newCount--;
          if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
            return packNodes(ownerID, nodes, newCount, idx);
          }
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newNodes = setAt(nodes, idx, newNode, isEditable);
        if (isEditable) {
          this.count = newCount;
          this.nodes = newNodes;
          return this;
        }
        return new HashArrayMapNode(ownerID, newCount, newNodes);
      };
      var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries) {
        this.ownerID = ownerID;
        this.keyHash = keyHash;
        this.entries = entries;
      };
      HashCollisionNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        var entries = this.entries;
        for (var ii = 0, len = entries.length; ii < len; ii++) {
          if (is(key, entries[ii][0])) {
            return entries[ii][1];
          }
        }
        return notSetValue;
      };
      HashCollisionNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var removed = value === NOT_SET;
        if (keyHash !== this.keyHash) {
          if (removed) {
            return this;
          }
          SetRef(didAlter);
          SetRef(didChangeSize);
          return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
        }
        var entries = this.entries;
        var idx = 0;
        var len = entries.length;
        for (; idx < len; idx++) {
          if (is(key, entries[idx][0])) {
            break;
          }
        }
        var exists = idx < len;
        if (exists ? entries[idx][1] === value : removed) {
          return this;
        }
        SetRef(didAlter);
        (removed || !exists) && SetRef(didChangeSize);
        if (removed && len === 2) {
          return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newEntries = isEditable ? entries : arrCopy(entries);
        if (exists) {
          if (removed) {
            idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
          } else {
            newEntries[idx] = [key, value];
          }
        } else {
          newEntries.push([key, value]);
        }
        if (isEditable) {
          this.entries = newEntries;
          return this;
        }
        return new HashCollisionNode(ownerID, this.keyHash, newEntries);
      };
      var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
        this.ownerID = ownerID;
        this.keyHash = keyHash;
        this.entry = entry;
      };
      ValueNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
      };
      ValueNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        var removed = value === NOT_SET;
        var keyMatch = is(key, this.entry[0]);
        if (keyMatch ? value === this.entry[1] : removed) {
          return this;
        }
        SetRef(didAlter);
        if (removed) {
          SetRef(didChangeSize);
          return;
        }
        if (keyMatch) {
          if (ownerID && ownerID === this.ownerID) {
            this.entry[1] = value;
            return this;
          }
          return new ValueNode(ownerID, this.keyHash, [key, value]);
        }
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
      };
      ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse) {
        var entries = this.entries;
        for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
          if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
            return false;
          }
        }
      };
      BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse) {
        var nodes = this.nodes;
        for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
          var node = nodes[reverse ? maxIndex - ii : ii];
          if (node && node.iterate(fn, reverse) === false) {
            return false;
          }
        }
      };
      ValueNode.prototype.iterate = function(fn, reverse) {
        return fn(this.entry);
      };
      var MapIterator = /* @__PURE__ */ function(Iterator2) {
        function MapIterator2(map, type, reverse) {
          this._type = type;
          this._reverse = reverse;
          this._stack = map._root && mapIteratorFrame(map._root);
        }
        if (Iterator2)
          MapIterator2.__proto__ = Iterator2;
        MapIterator2.prototype = Object.create(Iterator2 && Iterator2.prototype);
        MapIterator2.prototype.constructor = MapIterator2;
        MapIterator2.prototype.next = function next() {
          var type = this._type;
          var stack = this._stack;
          while (stack) {
            var node = stack.node;
            var index = stack.index++;
            var maxIndex = void 0;
            if (node.entry) {
              if (index === 0) {
                return mapIteratorValue(type, node.entry);
              }
            } else if (node.entries) {
              maxIndex = node.entries.length - 1;
              if (index <= maxIndex) {
                return mapIteratorValue(
                  type,
                  node.entries[this._reverse ? maxIndex - index : index]
                );
              }
            } else {
              maxIndex = node.nodes.length - 1;
              if (index <= maxIndex) {
                var subNode = node.nodes[this._reverse ? maxIndex - index : index];
                if (subNode) {
                  if (subNode.entry) {
                    return mapIteratorValue(type, subNode.entry);
                  }
                  stack = this._stack = mapIteratorFrame(subNode, stack);
                }
                continue;
              }
            }
            stack = this._stack = this._stack.__prev;
          }
          return iteratorDone();
        };
        return MapIterator2;
      }(Iterator);
      function mapIteratorValue(type, entry) {
        return iteratorValue(type, entry[0], entry[1]);
      }
      function mapIteratorFrame(node, prev) {
        return {
          node,
          index: 0,
          __prev: prev
        };
      }
      function makeMap(size, root, ownerID, hash2) {
        var map = Object.create(MapPrototype);
        map.size = size;
        map._root = root;
        map.__ownerID = ownerID;
        map.__hash = hash2;
        map.__altered = false;
        return map;
      }
      var EMPTY_MAP;
      function emptyMap() {
        return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
      }
      function updateMap(map, k, v) {
        var newRoot;
        var newSize;
        if (!map._root) {
          if (v === NOT_SET) {
            return map;
          }
          newSize = 1;
          newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
        } else {
          var didChangeSize = MakeRef();
          var didAlter = MakeRef();
          newRoot = updateNode(
            map._root,
            map.__ownerID,
            0,
            void 0,
            k,
            v,
            didChangeSize,
            didAlter
          );
          if (!didAlter.value) {
            return map;
          }
          newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
        }
        if (map.__ownerID) {
          map.size = newSize;
          map._root = newRoot;
          map.__hash = void 0;
          map.__altered = true;
          return map;
        }
        return newRoot ? makeMap(newSize, newRoot) : emptyMap();
      }
      function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (!node) {
          if (value === NOT_SET) {
            return node;
          }
          SetRef(didAlter);
          SetRef(didChangeSize);
          return new ValueNode(ownerID, keyHash, [key, value]);
        }
        return node.update(
          ownerID,
          shift,
          keyHash,
          key,
          value,
          didChangeSize,
          didAlter
        );
      }
      function isLeafNode(node) {
        return node.constructor === ValueNode || node.constructor === HashCollisionNode;
      }
      function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
        if (node.keyHash === keyHash) {
          return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
        }
        var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
        var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var newNode;
        var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
        return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
      }
      function createNodes(ownerID, entries, key, value) {
        if (!ownerID) {
          ownerID = new OwnerID();
        }
        var node = new ValueNode(ownerID, hash(key), [key, value]);
        for (var ii = 0; ii < entries.length; ii++) {
          var entry = entries[ii];
          node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
        }
        return node;
      }
      function packNodes(ownerID, nodes, count, excluding) {
        var bitmap = 0;
        var packedII = 0;
        var packedNodes = new Array(count);
        for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
          var node = nodes[ii];
          if (node !== void 0 && ii !== excluding) {
            bitmap |= bit;
            packedNodes[packedII++] = node;
          }
        }
        return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
      }
      function expandNodes(ownerID, nodes, bitmap, including, node) {
        var count = 0;
        var expandedNodes = new Array(SIZE);
        for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
          expandedNodes[ii] = bitmap & 1 ? nodes[count++] : void 0;
        }
        expandedNodes[including] = node;
        return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
      }
      function popCount(x) {
        x -= x >> 1 & 1431655765;
        x = (x & 858993459) + (x >> 2 & 858993459);
        x = x + (x >> 4) & 252645135;
        x += x >> 8;
        x += x >> 16;
        return x & 127;
      }
      function setAt(array, idx, val, canEdit) {
        var newArray = canEdit ? array : arrCopy(array);
        newArray[idx] = val;
        return newArray;
      }
      function spliceIn(array, idx, val, canEdit) {
        var newLen = array.length + 1;
        if (canEdit && idx + 1 === newLen) {
          array[idx] = val;
          return array;
        }
        var newArray = new Array(newLen);
        var after = 0;
        for (var ii = 0; ii < newLen; ii++) {
          if (ii === idx) {
            newArray[ii] = val;
            after = -1;
          } else {
            newArray[ii] = array[ii + after];
          }
        }
        return newArray;
      }
      function spliceOut(array, idx, canEdit) {
        var newLen = array.length - 1;
        if (canEdit && idx === newLen) {
          array.pop();
          return array;
        }
        var newArray = new Array(newLen);
        var after = 0;
        for (var ii = 0; ii < newLen; ii++) {
          if (ii === idx) {
            after = 1;
          }
          newArray[ii] = array[ii + after];
        }
        return newArray;
      }
      var MAX_ARRAY_MAP_SIZE = SIZE / 4;
      var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
      var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
      var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
      function isList(maybeList) {
        return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
      }
      var List = /* @__PURE__ */ function(IndexedCollection2) {
        function List2(value) {
          var empty = emptyList();
          if (value === void 0 || value === null) {
            return empty;
          }
          if (isList(value)) {
            return value;
          }
          var iter = IndexedCollection2(value);
          var size = iter.size;
          if (size === 0) {
            return empty;
          }
          assertNotInfinite(size);
          if (size > 0 && size < SIZE) {
            return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
          }
          return empty.withMutations(function(list) {
            list.setSize(size);
            iter.forEach(function(v, i) {
              return list.set(i, v);
            });
          });
        }
        if (IndexedCollection2)
          List2.__proto__ = IndexedCollection2;
        List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
        List2.prototype.constructor = List2;
        List2.of = function of() {
          return this(arguments);
        };
        List2.prototype.toString = function toString2() {
          return this.__toString("List [", "]");
        };
        List2.prototype.get = function get2(index, notSetValue) {
          index = wrapIndex(this, index);
          if (index >= 0 && index < this.size) {
            index += this._origin;
            var node = listNodeFor(this, index);
            return node && node.array[index & MASK];
          }
          return notSetValue;
        };
        List2.prototype.set = function set2(index, value) {
          return updateList(this, index, value);
        };
        List2.prototype.remove = function remove2(index) {
          return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
        };
        List2.prototype.insert = function insert(index, value) {
          return this.splice(index, 0, value);
        };
        List2.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = this._origin = this._capacity = 0;
            this._level = SHIFT;
            this._root = this._tail = this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return emptyList();
        };
        List2.prototype.push = function push() {
          var values = arguments;
          var oldSize = this.size;
          return this.withMutations(function(list) {
            setListBounds(list, 0, oldSize + values.length);
            for (var ii = 0; ii < values.length; ii++) {
              list.set(oldSize + ii, values[ii]);
            }
          });
        };
        List2.prototype.pop = function pop() {
          return setListBounds(this, 0, -1);
        };
        List2.prototype.unshift = function unshift() {
          var values = arguments;
          return this.withMutations(function(list) {
            setListBounds(list, -values.length);
            for (var ii = 0; ii < values.length; ii++) {
              list.set(ii, values[ii]);
            }
          });
        };
        List2.prototype.shift = function shift() {
          return setListBounds(this, 1);
        };
        List2.prototype.concat = function concat() {
          var arguments$1 = arguments;
          var seqs = [];
          for (var i = 0; i < arguments.length; i++) {
            var argument = arguments$1[i];
            var seq = IndexedCollection2(
              typeof argument !== "string" && hasIterator(argument) ? argument : [argument]
            );
            if (seq.size !== 0) {
              seqs.push(seq);
            }
          }
          if (seqs.length === 0) {
            return this;
          }
          if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
            return this.constructor(seqs[0]);
          }
          return this.withMutations(function(list) {
            seqs.forEach(function(seq2) {
              return seq2.forEach(function(value) {
                return list.push(value);
              });
            });
          });
        };
        List2.prototype.setSize = function setSize(size) {
          return setListBounds(this, 0, size);
        };
        List2.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          return this.withMutations(function(list) {
            for (var i = 0; i < this$1$1.size; i++) {
              list.set(i, mapper.call(context, list.get(i), i, this$1$1));
            }
          });
        };
        List2.prototype.slice = function slice(begin, end) {
          var size = this.size;
          if (wholeSlice(begin, end, size)) {
            return this;
          }
          return setListBounds(
            this,
            resolveBegin(begin, size),
            resolveEnd(end, size)
          );
        };
        List2.prototype.__iterator = function __iterator(type, reverse) {
          var index = reverse ? this.size : 0;
          var values = iterateList(this, reverse);
          return new Iterator(function() {
            var value = values();
            return value === DONE ? iteratorDone() : iteratorValue(type, reverse ? --index : index++, value);
          });
        };
        List2.prototype.__iterate = function __iterate(fn, reverse) {
          var index = reverse ? this.size : 0;
          var values = iterateList(this, reverse);
          var value;
          while ((value = values()) !== DONE) {
            if (fn(value, reverse ? --index : index++, this) === false) {
              break;
            }
          }
          return index;
        };
        List2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          if (!ownerID) {
            if (this.size === 0) {
              return emptyList();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            return this;
          }
          return makeList(
            this._origin,
            this._capacity,
            this._level,
            this._root,
            this._tail,
            ownerID,
            this.__hash
          );
        };
        return List2;
      }(IndexedCollection);
      List.isList = isList;
      var ListPrototype = List.prototype;
      ListPrototype[IS_LIST_SYMBOL] = true;
      ListPrototype[DELETE] = ListPrototype.remove;
      ListPrototype.merge = ListPrototype.concat;
      ListPrototype.setIn = setIn;
      ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
      ListPrototype.update = update;
      ListPrototype.updateIn = updateIn;
      ListPrototype.mergeIn = mergeIn;
      ListPrototype.mergeDeepIn = mergeDeepIn;
      ListPrototype.withMutations = withMutations;
      ListPrototype.wasAltered = wasAltered;
      ListPrototype.asImmutable = asImmutable;
      ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
      ListPrototype["@@transducer/step"] = function(result, arr) {
        return result.push(arr);
      };
      ListPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      var VNode = function VNode2(array, ownerID) {
        this.array = array;
        this.ownerID = ownerID;
      };
      VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
        if ((index & (1 << level + SHIFT) - 1) === 0 || this.array.length === 0) {
          return this;
        }
        var originIndex = index >>> level & MASK;
        if (originIndex >= this.array.length) {
          return new VNode([], ownerID);
        }
        var removingFirst = originIndex === 0;
        var newChild;
        if (level > 0) {
          var oldChild = this.array[originIndex];
          newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
          if (newChild === oldChild && removingFirst) {
            return this;
          }
        }
        if (removingFirst && !newChild) {
          return this;
        }
        var editable = editableVNode(this, ownerID);
        if (!removingFirst) {
          for (var ii = 0; ii < originIndex; ii++) {
            editable.array[ii] = void 0;
          }
        }
        if (newChild) {
          editable.array[originIndex] = newChild;
        }
        return editable;
      };
      VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
        if (index === (level ? 1 << level + SHIFT : SIZE) || this.array.length === 0) {
          return this;
        }
        var sizeIndex = index - 1 >>> level & MASK;
        if (sizeIndex >= this.array.length) {
          return this;
        }
        var newChild;
        if (level > 0) {
          var oldChild = this.array[sizeIndex];
          newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
          if (newChild === oldChild && sizeIndex === this.array.length - 1) {
            return this;
          }
        }
        var editable = editableVNode(this, ownerID);
        editable.array.splice(sizeIndex + 1);
        if (newChild) {
          editable.array[sizeIndex] = newChild;
        }
        return editable;
      };
      var DONE = {};
      function iterateList(list, reverse) {
        var left = list._origin;
        var right = list._capacity;
        var tailPos = getTailOffset(right);
        var tail = list._tail;
        return iterateNodeOrLeaf(list._root, list._level, 0);
        function iterateNodeOrLeaf(node, level, offset) {
          return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
        }
        function iterateLeaf(node, offset) {
          var array = offset === tailPos ? tail && tail.array : node && node.array;
          var from = offset > left ? 0 : left - offset;
          var to = right - offset;
          if (to > SIZE) {
            to = SIZE;
          }
          return function() {
            if (from === to) {
              return DONE;
            }
            var idx = reverse ? --to : from++;
            return array && array[idx];
          };
        }
        function iterateNode(node, level, offset) {
          var values;
          var array = node && node.array;
          var from = offset > left ? 0 : left - offset >> level;
          var to = (right - offset >> level) + 1;
          if (to > SIZE) {
            to = SIZE;
          }
          return function() {
            while (true) {
              if (values) {
                var value = values();
                if (value !== DONE) {
                  return value;
                }
                values = null;
              }
              if (from === to) {
                return DONE;
              }
              var idx = reverse ? --to : from++;
              values = iterateNodeOrLeaf(
                array && array[idx],
                level - SHIFT,
                offset + (idx << level)
              );
            }
          };
        }
      }
      function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
        var list = Object.create(ListPrototype);
        list.size = capacity - origin;
        list._origin = origin;
        list._capacity = capacity;
        list._level = level;
        list._root = root;
        list._tail = tail;
        list.__ownerID = ownerID;
        list.__hash = hash2;
        list.__altered = false;
        return list;
      }
      function emptyList() {
        return makeList(0, 0, SHIFT);
      }
      function updateList(list, index, value) {
        index = wrapIndex(list, index);
        if (index !== index) {
          return list;
        }
        if (index >= list.size || index < 0) {
          return list.withMutations(function(list2) {
            index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
          });
        }
        index += list._origin;
        var newTail = list._tail;
        var newRoot = list._root;
        var didAlter = MakeRef();
        if (index >= getTailOffset(list._capacity)) {
          newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
        } else {
          newRoot = updateVNode(
            newRoot,
            list.__ownerID,
            list._level,
            index,
            value,
            didAlter
          );
        }
        if (!didAlter.value) {
          return list;
        }
        if (list.__ownerID) {
          list._root = newRoot;
          list._tail = newTail;
          list.__hash = void 0;
          list.__altered = true;
          return list;
        }
        return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
      }
      function updateVNode(node, ownerID, level, index, value, didAlter) {
        var idx = index >>> level & MASK;
        var nodeHas = node && idx < node.array.length;
        if (!nodeHas && value === void 0) {
          return node;
        }
        var newNode;
        if (level > 0) {
          var lowerNode = node && node.array[idx];
          var newLowerNode = updateVNode(
            lowerNode,
            ownerID,
            level - SHIFT,
            index,
            value,
            didAlter
          );
          if (newLowerNode === lowerNode) {
            return node;
          }
          newNode = editableVNode(node, ownerID);
          newNode.array[idx] = newLowerNode;
          return newNode;
        }
        if (nodeHas && node.array[idx] === value) {
          return node;
        }
        if (didAlter) {
          SetRef(didAlter);
        }
        newNode = editableVNode(node, ownerID);
        if (value === void 0 && idx === newNode.array.length - 1) {
          newNode.array.pop();
        } else {
          newNode.array[idx] = value;
        }
        return newNode;
      }
      function editableVNode(node, ownerID) {
        if (ownerID && node && ownerID === node.ownerID) {
          return node;
        }
        return new VNode(node ? node.array.slice() : [], ownerID);
      }
      function listNodeFor(list, rawIndex) {
        if (rawIndex >= getTailOffset(list._capacity)) {
          return list._tail;
        }
        if (rawIndex < 1 << list._level + SHIFT) {
          var node = list._root;
          var level = list._level;
          while (node && level > 0) {
            node = node.array[rawIndex >>> level & MASK];
            level -= SHIFT;
          }
          return node;
        }
      }
      function setListBounds(list, begin, end) {
        if (begin !== void 0) {
          begin |= 0;
        }
        if (end !== void 0) {
          end |= 0;
        }
        var owner = list.__ownerID || new OwnerID();
        var oldOrigin = list._origin;
        var oldCapacity = list._capacity;
        var newOrigin = oldOrigin + begin;
        var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
        if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
          return list;
        }
        if (newOrigin >= newCapacity) {
          return list.clear();
        }
        var newLevel = list._level;
        var newRoot = list._root;
        var offsetShift = 0;
        while (newOrigin + offsetShift < 0) {
          newRoot = new VNode(
            newRoot && newRoot.array.length ? [void 0, newRoot] : [],
            owner
          );
          newLevel += SHIFT;
          offsetShift += 1 << newLevel;
        }
        if (offsetShift) {
          newOrigin += offsetShift;
          oldOrigin += offsetShift;
          newCapacity += offsetShift;
          oldCapacity += offsetShift;
        }
        var oldTailOffset = getTailOffset(oldCapacity);
        var newTailOffset = getTailOffset(newCapacity);
        while (newTailOffset >= 1 << newLevel + SHIFT) {
          newRoot = new VNode(
            newRoot && newRoot.array.length ? [newRoot] : [],
            owner
          );
          newLevel += SHIFT;
        }
        var oldTail = list._tail;
        var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
        if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
          newRoot = editableVNode(newRoot, owner);
          var node = newRoot;
          for (var level = newLevel; level > SHIFT; level -= SHIFT) {
            var idx = oldTailOffset >>> level & MASK;
            node = node.array[idx] = editableVNode(node.array[idx], owner);
          }
          node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
        }
        if (newCapacity < oldCapacity) {
          newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
        }
        if (newOrigin >= newTailOffset) {
          newOrigin -= newTailOffset;
          newCapacity -= newTailOffset;
          newLevel = SHIFT;
          newRoot = null;
          newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
        } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
          offsetShift = 0;
          while (newRoot) {
            var beginIndex = newOrigin >>> newLevel & MASK;
            if (beginIndex !== newTailOffset >>> newLevel & MASK) {
              break;
            }
            if (beginIndex) {
              offsetShift += (1 << newLevel) * beginIndex;
            }
            newLevel -= SHIFT;
            newRoot = newRoot.array[beginIndex];
          }
          if (newRoot && newOrigin > oldOrigin) {
            newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
          }
          if (newRoot && newTailOffset < oldTailOffset) {
            newRoot = newRoot.removeAfter(
              owner,
              newLevel,
              newTailOffset - offsetShift
            );
          }
          if (offsetShift) {
            newOrigin -= offsetShift;
            newCapacity -= offsetShift;
          }
        }
        if (list.__ownerID) {
          list.size = newCapacity - newOrigin;
          list._origin = newOrigin;
          list._capacity = newCapacity;
          list._level = newLevel;
          list._root = newRoot;
          list._tail = newTail;
          list.__hash = void 0;
          list.__altered = true;
          return list;
        }
        return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
      }
      function getTailOffset(size) {
        return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
      }
      var OrderedMap = /* @__PURE__ */ function(Map3) {
        function OrderedMap2(value) {
          return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map) {
            var iter = KeyedCollection(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v, k) {
              return map.set(k, v);
            });
          });
        }
        if (Map3)
          OrderedMap2.__proto__ = Map3;
        OrderedMap2.prototype = Object.create(Map3 && Map3.prototype);
        OrderedMap2.prototype.constructor = OrderedMap2;
        OrderedMap2.of = function of() {
          return this(arguments);
        };
        OrderedMap2.prototype.toString = function toString2() {
          return this.__toString("OrderedMap {", "}");
        };
        OrderedMap2.prototype.get = function get2(k, notSetValue) {
          var index = this._map.get(k);
          return index !== void 0 ? this._list.get(index)[1] : notSetValue;
        };
        OrderedMap2.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = 0;
            this._map.clear();
            this._list.clear();
            this.__altered = true;
            return this;
          }
          return emptyOrderedMap();
        };
        OrderedMap2.prototype.set = function set2(k, v) {
          return updateOrderedMap(this, k, v);
        };
        OrderedMap2.prototype.remove = function remove2(k) {
          return updateOrderedMap(this, k, NOT_SET);
        };
        OrderedMap2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._list.__iterate(
            function(entry) {
              return entry && fn(entry[1], entry[0], this$1$1);
            },
            reverse
          );
        };
        OrderedMap2.prototype.__iterator = function __iterator(type, reverse) {
          return this._list.fromEntrySeq().__iterator(type, reverse);
        };
        OrderedMap2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          var newMap = this._map.__ensureOwner(ownerID);
          var newList = this._list.__ensureOwner(ownerID);
          if (!ownerID) {
            if (this.size === 0) {
              return emptyOrderedMap();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            this._map = newMap;
            this._list = newList;
            return this;
          }
          return makeOrderedMap(newMap, newList, ownerID, this.__hash);
        };
        return OrderedMap2;
      }(Map2);
      OrderedMap.isOrderedMap = isOrderedMap;
      OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
      OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
      function makeOrderedMap(map, list, ownerID, hash2) {
        var omap = Object.create(OrderedMap.prototype);
        omap.size = map ? map.size : 0;
        omap._map = map;
        omap._list = list;
        omap.__ownerID = ownerID;
        omap.__hash = hash2;
        omap.__altered = false;
        return omap;
      }
      var EMPTY_ORDERED_MAP;
      function emptyOrderedMap() {
        return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
      }
      function updateOrderedMap(omap, k, v) {
        var map = omap._map;
        var list = omap._list;
        var i = map.get(k);
        var has2 = i !== void 0;
        var newMap;
        var newList;
        if (v === NOT_SET) {
          if (!has2) {
            return omap;
          }
          if (list.size >= SIZE && list.size >= map.size * 2) {
            newList = list.filter(function(entry, idx) {
              return entry !== void 0 && i !== idx;
            });
            newMap = newList.toKeyedSeq().map(function(entry) {
              return entry[0];
            }).flip().toMap();
            if (omap.__ownerID) {
              newMap.__ownerID = newList.__ownerID = omap.__ownerID;
            }
          } else {
            newMap = map.remove(k);
            newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
          }
        } else if (has2) {
          if (v === list.get(i)[1]) {
            return omap;
          }
          newMap = map;
          newList = list.set(i, [k, v]);
        } else {
          newMap = map.set(k, list.size);
          newList = list.set(list.size, [k, v]);
        }
        if (omap.__ownerID) {
          omap.size = newMap.size;
          omap._map = newMap;
          omap._list = newList;
          omap.__hash = void 0;
          omap.__altered = true;
          return omap;
        }
        return makeOrderedMap(newMap, newList);
      }
      var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
      function isStack(maybeStack) {
        return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
      }
      var Stack = /* @__PURE__ */ function(IndexedCollection2) {
        function Stack2(value) {
          return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
        }
        if (IndexedCollection2)
          Stack2.__proto__ = IndexedCollection2;
        Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
        Stack2.prototype.constructor = Stack2;
        Stack2.of = function of() {
          return this(arguments);
        };
        Stack2.prototype.toString = function toString2() {
          return this.__toString("Stack [", "]");
        };
        Stack2.prototype.get = function get2(index, notSetValue) {
          var head = this._head;
          index = wrapIndex(this, index);
          while (head && index--) {
            head = head.next;
          }
          return head ? head.value : notSetValue;
        };
        Stack2.prototype.peek = function peek() {
          return this._head && this._head.value;
        };
        Stack2.prototype.push = function push() {
          var arguments$1 = arguments;
          if (arguments.length === 0) {
            return this;
          }
          var newSize = this.size + arguments.length;
          var head = this._head;
          for (var ii = arguments.length - 1; ii >= 0; ii--) {
            head = {
              value: arguments$1[ii],
              next: head
            };
          }
          if (this.__ownerID) {
            this.size = newSize;
            this._head = head;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return makeStack(newSize, head);
        };
        Stack2.prototype.pushAll = function pushAll(iter) {
          iter = IndexedCollection2(iter);
          if (iter.size === 0) {
            return this;
          }
          if (this.size === 0 && isStack(iter)) {
            return iter;
          }
          assertNotInfinite(iter.size);
          var newSize = this.size;
          var head = this._head;
          iter.__iterate(
            function(value) {
              newSize++;
              head = {
                value,
                next: head
              };
            },
            /* reverse */
            true
          );
          if (this.__ownerID) {
            this.size = newSize;
            this._head = head;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return makeStack(newSize, head);
        };
        Stack2.prototype.pop = function pop() {
          return this.slice(1);
        };
        Stack2.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = 0;
            this._head = void 0;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return emptyStack();
        };
        Stack2.prototype.slice = function slice(begin, end) {
          if (wholeSlice(begin, end, this.size)) {
            return this;
          }
          var resolvedBegin = resolveBegin(begin, this.size);
          var resolvedEnd = resolveEnd(end, this.size);
          if (resolvedEnd !== this.size) {
            return IndexedCollection2.prototype.slice.call(this, begin, end);
          }
          var newSize = this.size - resolvedBegin;
          var head = this._head;
          while (resolvedBegin--) {
            head = head.next;
          }
          if (this.__ownerID) {
            this.size = newSize;
            this._head = head;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return makeStack(newSize, head);
        };
        Stack2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          if (!ownerID) {
            if (this.size === 0) {
              return emptyStack();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            return this;
          }
          return makeStack(this.size, this._head, ownerID, this.__hash);
        };
        Stack2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return new ArraySeq(this.toArray()).__iterate(
              function(v, k) {
                return fn(v, k, this$1$1);
              },
              reverse
            );
          }
          var iterations = 0;
          var node = this._head;
          while (node) {
            if (fn(node.value, iterations++, this) === false) {
              break;
            }
            node = node.next;
          }
          return iterations;
        };
        Stack2.prototype.__iterator = function __iterator(type, reverse) {
          if (reverse) {
            return new ArraySeq(this.toArray()).__iterator(type, reverse);
          }
          var iterations = 0;
          var node = this._head;
          return new Iterator(function() {
            if (node) {
              var value = node.value;
              node = node.next;
              return iteratorValue(type, iterations++, value);
            }
            return iteratorDone();
          });
        };
        return Stack2;
      }(IndexedCollection);
      Stack.isStack = isStack;
      var StackPrototype = Stack.prototype;
      StackPrototype[IS_STACK_SYMBOL] = true;
      StackPrototype.shift = StackPrototype.pop;
      StackPrototype.unshift = StackPrototype.push;
      StackPrototype.unshiftAll = StackPrototype.pushAll;
      StackPrototype.withMutations = withMutations;
      StackPrototype.wasAltered = wasAltered;
      StackPrototype.asImmutable = asImmutable;
      StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
      StackPrototype["@@transducer/step"] = function(result, arr) {
        return result.unshift(arr);
      };
      StackPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      function makeStack(size, head, ownerID, hash2) {
        var map = Object.create(StackPrototype);
        map.size = size;
        map._head = head;
        map.__ownerID = ownerID;
        map.__hash = hash2;
        map.__altered = false;
        return map;
      }
      var EMPTY_STACK;
      function emptyStack() {
        return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
      }
      var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
      function isSet(maybeSet) {
        return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
      }
      function isOrderedSet(maybeOrderedSet) {
        return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
      }
      function deepEqual(a, b) {
        if (a === b) {
          return true;
        }
        if (!isCollection(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
          return false;
        }
        if (a.size === 0 && b.size === 0) {
          return true;
        }
        var notAssociative = !isAssociative(a);
        if (isOrdered(a)) {
          var entries = a.entries();
          return b.every(function(v, k) {
            var entry = entries.next().value;
            return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
          }) && entries.next().done;
        }
        var flipped = false;
        if (a.size === void 0) {
          if (b.size === void 0) {
            if (typeof a.cacheResult === "function") {
              a.cacheResult();
            }
          } else {
            flipped = true;
            var _ = a;
            a = b;
            b = _;
          }
        }
        var allEqual = true;
        var bSize = b.__iterate(function(v, k) {
          if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
            allEqual = false;
            return false;
          }
        });
        return allEqual && a.size === bSize;
      }
      function mixin(ctor, methods) {
        var keyCopier = function(key) {
          ctor.prototype[key] = methods[key];
        };
        Object.keys(methods).forEach(keyCopier);
        Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
        return ctor;
      }
      function toJS(value) {
        if (!value || typeof value !== "object") {
          return value;
        }
        if (!isCollection(value)) {
          if (!isDataStructure(value)) {
            return value;
          }
          value = Seq(value);
        }
        if (isKeyed(value)) {
          var result$1 = {};
          value.__iterate(function(v, k) {
            result$1[k] = toJS(v);
          });
          return result$1;
        }
        var result = [];
        value.__iterate(function(v) {
          result.push(toJS(v));
        });
        return result;
      }
      var Set2 = /* @__PURE__ */ function(SetCollection2) {
        function Set3(value) {
          return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set2) {
            var iter = SetCollection2(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v) {
              return set2.add(v);
            });
          });
        }
        if (SetCollection2)
          Set3.__proto__ = SetCollection2;
        Set3.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
        Set3.prototype.constructor = Set3;
        Set3.of = function of() {
          return this(arguments);
        };
        Set3.fromKeys = function fromKeys(value) {
          return this(KeyedCollection(value).keySeq());
        };
        Set3.intersect = function intersect(sets) {
          sets = Collection(sets).toArray();
          return sets.length ? SetPrototype.intersect.apply(Set3(sets.pop()), sets) : emptySet();
        };
        Set3.union = function union(sets) {
          sets = Collection(sets).toArray();
          return sets.length ? SetPrototype.union.apply(Set3(sets.pop()), sets) : emptySet();
        };
        Set3.prototype.toString = function toString2() {
          return this.__toString("Set {", "}");
        };
        Set3.prototype.has = function has2(value) {
          return this._map.has(value);
        };
        Set3.prototype.add = function add(value) {
          return updateSet(this, this._map.set(value, value));
        };
        Set3.prototype.remove = function remove2(value) {
          return updateSet(this, this._map.remove(value));
        };
        Set3.prototype.clear = function clear() {
          return updateSet(this, this._map.clear());
        };
        Set3.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          var didChanges = false;
          var newMap = updateSet(
            this,
            this._map.mapEntries(function(ref) {
              var v = ref[1];
              var mapped = mapper.call(context, v, v, this$1$1);
              if (mapped !== v) {
                didChanges = true;
              }
              return [mapped, mapped];
            }, context)
          );
          return didChanges ? newMap : this;
        };
        Set3.prototype.union = function union() {
          var iters = [], len = arguments.length;
          while (len--)
            iters[len] = arguments[len];
          iters = iters.filter(function(x) {
            return x.size !== 0;
          });
          if (iters.length === 0) {
            return this;
          }
          if (this.size === 0 && !this.__ownerID && iters.length === 1) {
            return this.constructor(iters[0]);
          }
          return this.withMutations(function(set2) {
            for (var ii = 0; ii < iters.length; ii++) {
              if (typeof iters[ii] === "string") {
                set2.add(iters[ii]);
              } else {
                SetCollection2(iters[ii]).forEach(function(value) {
                  return set2.add(value);
                });
              }
            }
          });
        };
        Set3.prototype.intersect = function intersect() {
          var iters = [], len = arguments.length;
          while (len--)
            iters[len] = arguments[len];
          if (iters.length === 0) {
            return this;
          }
          iters = iters.map(function(iter) {
            return SetCollection2(iter);
          });
          var toRemove = [];
          this.forEach(function(value) {
            if (!iters.every(function(iter) {
              return iter.includes(value);
            })) {
              toRemove.push(value);
            }
          });
          return this.withMutations(function(set2) {
            toRemove.forEach(function(value) {
              set2.remove(value);
            });
          });
        };
        Set3.prototype.subtract = function subtract() {
          var iters = [], len = arguments.length;
          while (len--)
            iters[len] = arguments[len];
          if (iters.length === 0) {
            return this;
          }
          iters = iters.map(function(iter) {
            return SetCollection2(iter);
          });
          var toRemove = [];
          this.forEach(function(value) {
            if (iters.some(function(iter) {
              return iter.includes(value);
            })) {
              toRemove.push(value);
            }
          });
          return this.withMutations(function(set2) {
            toRemove.forEach(function(value) {
              set2.remove(value);
            });
          });
        };
        Set3.prototype.sort = function sort(comparator) {
          return OrderedSet(sortFactory(this, comparator));
        };
        Set3.prototype.sortBy = function sortBy(mapper, comparator) {
          return OrderedSet(sortFactory(this, comparator, mapper));
        };
        Set3.prototype.wasAltered = function wasAltered2() {
          return this._map.wasAltered();
        };
        Set3.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._map.__iterate(function(k) {
            return fn(k, k, this$1$1);
          }, reverse);
        };
        Set3.prototype.__iterator = function __iterator(type, reverse) {
          return this._map.__iterator(type, reverse);
        };
        Set3.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          var newMap = this._map.__ensureOwner(ownerID);
          if (!ownerID) {
            if (this.size === 0) {
              return this.__empty();
            }
            this.__ownerID = ownerID;
            this._map = newMap;
            return this;
          }
          return this.__make(newMap, ownerID);
        };
        return Set3;
      }(SetCollection);
      Set2.isSet = isSet;
      var SetPrototype = Set2.prototype;
      SetPrototype[IS_SET_SYMBOL] = true;
      SetPrototype[DELETE] = SetPrototype.remove;
      SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
      SetPrototype.withMutations = withMutations;
      SetPrototype.asImmutable = asImmutable;
      SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
      SetPrototype["@@transducer/step"] = function(result, arr) {
        return result.add(arr);
      };
      SetPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      SetPrototype.__empty = emptySet;
      SetPrototype.__make = makeSet;
      function updateSet(set2, newMap) {
        if (set2.__ownerID) {
          set2.size = newMap.size;
          set2._map = newMap;
          return set2;
        }
        return newMap === set2._map ? set2 : newMap.size === 0 ? set2.__empty() : set2.__make(newMap);
      }
      function makeSet(map, ownerID) {
        var set2 = Object.create(SetPrototype);
        set2.size = map ? map.size : 0;
        set2._map = map;
        set2.__ownerID = ownerID;
        return set2;
      }
      var EMPTY_SET;
      function emptySet() {
        return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
      }
      var Range = /* @__PURE__ */ function(IndexedSeq2) {
        function Range2(start, end, step) {
          if (step === void 0)
            step = 1;
          if (!(this instanceof Range2)) {
            return new Range2(start, end, step);
          }
          invariant(step !== 0, "Cannot step a Range by 0");
          invariant(
            start !== void 0,
            "You must define a start value when using Range"
          );
          invariant(
            end !== void 0,
            "You must define an end value when using Range"
          );
          step = Math.abs(step);
          if (end < start) {
            step = -step;
          }
          this._start = start;
          this._end = end;
          this._step = step;
          this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
          if (this.size === 0) {
            if (EMPTY_RANGE) {
              return EMPTY_RANGE;
            }
            EMPTY_RANGE = this;
          }
        }
        if (IndexedSeq2)
          Range2.__proto__ = IndexedSeq2;
        Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        Range2.prototype.constructor = Range2;
        Range2.prototype.toString = function toString2() {
          if (this.size === 0) {
            return "Range []";
          }
          return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
        };
        Range2.prototype.get = function get2(index, notSetValue) {
          return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
        };
        Range2.prototype.includes = function includes(searchValue) {
          var possibleIndex = (searchValue - this._start) / this._step;
          return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
        };
        Range2.prototype.slice = function slice(begin, end) {
          if (wholeSlice(begin, end, this.size)) {
            return this;
          }
          begin = resolveBegin(begin, this.size);
          end = resolveEnd(end, this.size);
          if (end <= begin) {
            return new Range2(0, 0);
          }
          return new Range2(
            this.get(begin, this._end),
            this.get(end, this._end),
            this._step
          );
        };
        Range2.prototype.indexOf = function indexOf(searchValue) {
          var offsetValue = searchValue - this._start;
          if (offsetValue % this._step === 0) {
            var index = offsetValue / this._step;
            if (index >= 0 && index < this.size) {
              return index;
            }
          }
          return -1;
        };
        Range2.prototype.lastIndexOf = function lastIndexOf(searchValue) {
          return this.indexOf(searchValue);
        };
        Range2.prototype.__iterate = function __iterate(fn, reverse) {
          var size = this.size;
          var step = this._step;
          var value = reverse ? this._start + (size - 1) * step : this._start;
          var i = 0;
          while (i !== size) {
            if (fn(value, reverse ? size - ++i : i++, this) === false) {
              break;
            }
            value += reverse ? -step : step;
          }
          return i;
        };
        Range2.prototype.__iterator = function __iterator(type, reverse) {
          var size = this.size;
          var step = this._step;
          var value = reverse ? this._start + (size - 1) * step : this._start;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var v = value;
            value += reverse ? -step : step;
            return iteratorValue(type, reverse ? size - ++i : i++, v);
          });
        };
        Range2.prototype.equals = function equals(other) {
          return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
        };
        return Range2;
      }(IndexedSeq);
      var EMPTY_RANGE;
      function getIn$1(collection, searchKeyPath, notSetValue) {
        var keyPath = coerceKeyPath(searchKeyPath);
        var i = 0;
        while (i !== keyPath.length) {
          collection = get(collection, keyPath[i++], NOT_SET);
          if (collection === NOT_SET) {
            return notSetValue;
          }
        }
        return collection;
      }
      function getIn(searchKeyPath, notSetValue) {
        return getIn$1(this, searchKeyPath, notSetValue);
      }
      function hasIn$1(collection, keyPath) {
        return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
      }
      function hasIn(searchKeyPath) {
        return hasIn$1(this, searchKeyPath);
      }
      function toObject() {
        assertNotInfinite(this.size);
        var object = {};
        this.__iterate(function(v, k) {
          object[k] = v;
        });
        return object;
      }
      Collection.Iterator = Iterator;
      mixin(Collection, {
        // ### Conversion to other types
        toArray: function toArray() {
          assertNotInfinite(this.size);
          var array = new Array(this.size || 0);
          var useTuples = isKeyed(this);
          var i = 0;
          this.__iterate(function(v, k) {
            array[i++] = useTuples ? [k, v] : v;
          });
          return array;
        },
        toIndexedSeq: function toIndexedSeq() {
          return new ToIndexedSequence(this);
        },
        toJS: function toJS$1() {
          return toJS(this);
        },
        toKeyedSeq: function toKeyedSeq() {
          return new ToKeyedSequence(this, true);
        },
        toMap: function toMap() {
          return Map2(this.toKeyedSeq());
        },
        toObject,
        toOrderedMap: function toOrderedMap() {
          return OrderedMap(this.toKeyedSeq());
        },
        toOrderedSet: function toOrderedSet() {
          return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
        },
        toSet: function toSet() {
          return Set2(isKeyed(this) ? this.valueSeq() : this);
        },
        toSetSeq: function toSetSeq() {
          return new ToSetSequence(this);
        },
        toSeq: function toSeq() {
          return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
        },
        toStack: function toStack() {
          return Stack(isKeyed(this) ? this.valueSeq() : this);
        },
        toList: function toList() {
          return List(isKeyed(this) ? this.valueSeq() : this);
        },
        // ### Common JavaScript methods and properties
        toString: function toString2() {
          return "[Collection]";
        },
        __toString: function __toString(head, tail) {
          if (this.size === 0) {
            return head + tail;
          }
          return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
        },
        // ### ES6 Collection methods (ES6 Array and Map)
        concat: function concat() {
          var values = [], len = arguments.length;
          while (len--)
            values[len] = arguments[len];
          return reify(this, concatFactory(this, values));
        },
        includes: function includes(searchValue) {
          return this.some(function(value) {
            return is(value, searchValue);
          });
        },
        entries: function entries() {
          return this.__iterator(ITERATE_ENTRIES);
        },
        every: function every(predicate, context) {
          assertNotInfinite(this.size);
          var returnValue = true;
          this.__iterate(function(v, k, c) {
            if (!predicate.call(context, v, k, c)) {
              returnValue = false;
              return false;
            }
          });
          return returnValue;
        },
        filter: function filter(predicate, context) {
          return reify(this, filterFactory(this, predicate, context, true));
        },
        partition: function partition(predicate, context) {
          return partitionFactory(this, predicate, context);
        },
        find: function find(predicate, context, notSetValue) {
          var entry = this.findEntry(predicate, context);
          return entry ? entry[1] : notSetValue;
        },
        forEach: function forEach(sideEffect, context) {
          assertNotInfinite(this.size);
          return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
        },
        join: function join(separator) {
          assertNotInfinite(this.size);
          separator = separator !== void 0 ? "" + separator : ",";
          var joined = "";
          var isFirst = true;
          this.__iterate(function(v) {
            isFirst ? isFirst = false : joined += separator;
            joined += v !== null && v !== void 0 ? v.toString() : "";
          });
          return joined;
        },
        keys: function keys() {
          return this.__iterator(ITERATE_KEYS);
        },
        map: function map(mapper, context) {
          return reify(this, mapFactory(this, mapper, context));
        },
        reduce: function reduce$1(reducer, initialReduction, context) {
          return reduce(
            this,
            reducer,
            initialReduction,
            context,
            arguments.length < 2,
            false
          );
        },
        reduceRight: function reduceRight(reducer, initialReduction, context) {
          return reduce(
            this,
            reducer,
            initialReduction,
            context,
            arguments.length < 2,
            true
          );
        },
        reverse: function reverse() {
          return reify(this, reverseFactory(this, true));
        },
        slice: function slice(begin, end) {
          return reify(this, sliceFactory(this, begin, end, true));
        },
        some: function some(predicate, context) {
          assertNotInfinite(this.size);
          var returnValue = false;
          this.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              returnValue = true;
              return false;
            }
          });
          return returnValue;
        },
        sort: function sort(comparator) {
          return reify(this, sortFactory(this, comparator));
        },
        values: function values() {
          return this.__iterator(ITERATE_VALUES);
        },
        // ### More sequential methods
        butLast: function butLast() {
          return this.slice(0, -1);
        },
        isEmpty: function isEmpty() {
          return this.size !== void 0 ? this.size === 0 : !this.some(function() {
            return true;
          });
        },
        count: function count(predicate, context) {
          return ensureSize(
            predicate ? this.toSeq().filter(predicate, context) : this
          );
        },
        countBy: function countBy(grouper, context) {
          return countByFactory(this, grouper, context);
        },
        equals: function equals(other) {
          return deepEqual(this, other);
        },
        entrySeq: function entrySeq() {
          var collection = this;
          if (collection._cache) {
            return new ArraySeq(collection._cache);
          }
          var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
          entriesSequence.fromEntrySeq = function() {
            return collection.toSeq();
          };
          return entriesSequence;
        },
        filterNot: function filterNot(predicate, context) {
          return this.filter(not(predicate), context);
        },
        findEntry: function findEntry(predicate, context, notSetValue) {
          var found = notSetValue;
          this.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              found = [k, v];
              return false;
            }
          });
          return found;
        },
        findKey: function findKey(predicate, context) {
          var entry = this.findEntry(predicate, context);
          return entry && entry[0];
        },
        findLast: function findLast(predicate, context, notSetValue) {
          return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
        },
        findLastEntry: function findLastEntry(predicate, context, notSetValue) {
          return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
        },
        findLastKey: function findLastKey(predicate, context) {
          return this.toKeyedSeq().reverse().findKey(predicate, context);
        },
        first: function first(notSetValue) {
          return this.find(returnTrue, null, notSetValue);
        },
        flatMap: function flatMap(mapper, context) {
          return reify(this, flatMapFactory(this, mapper, context));
        },
        flatten: function flatten(depth) {
          return reify(this, flattenFactory(this, depth, true));
        },
        fromEntrySeq: function fromEntrySeq() {
          return new FromEntriesSequence(this);
        },
        get: function get2(searchKey, notSetValue) {
          return this.find(function(_, key) {
            return is(key, searchKey);
          }, void 0, notSetValue);
        },
        getIn,
        groupBy: function groupBy(grouper, context) {
          return groupByFactory(this, grouper, context);
        },
        has: function has2(searchKey) {
          return this.get(searchKey, NOT_SET) !== NOT_SET;
        },
        hasIn,
        isSubset: function isSubset(iter) {
          iter = typeof iter.includes === "function" ? iter : Collection(iter);
          return this.every(function(value) {
            return iter.includes(value);
          });
        },
        isSuperset: function isSuperset(iter) {
          iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
          return iter.isSubset(this);
        },
        keyOf: function keyOf(searchValue) {
          return this.findKey(function(value) {
            return is(value, searchValue);
          });
        },
        keySeq: function keySeq() {
          return this.toSeq().map(keyMapper).toIndexedSeq();
        },
        last: function last(notSetValue) {
          return this.toSeq().reverse().first(notSetValue);
        },
        lastKeyOf: function lastKeyOf(searchValue) {
          return this.toKeyedSeq().reverse().keyOf(searchValue);
        },
        max: function max(comparator) {
          return maxFactory(this, comparator);
        },
        maxBy: function maxBy(mapper, comparator) {
          return maxFactory(this, comparator, mapper);
        },
        min: function min(comparator) {
          return maxFactory(
            this,
            comparator ? neg(comparator) : defaultNegComparator
          );
        },
        minBy: function minBy(mapper, comparator) {
          return maxFactory(
            this,
            comparator ? neg(comparator) : defaultNegComparator,
            mapper
          );
        },
        rest: function rest() {
          return this.slice(1);
        },
        skip: function skip(amount) {
          return amount === 0 ? this : this.slice(Math.max(0, amount));
        },
        skipLast: function skipLast(amount) {
          return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
        },
        skipWhile: function skipWhile(predicate, context) {
          return reify(this, skipWhileFactory(this, predicate, context, true));
        },
        skipUntil: function skipUntil(predicate, context) {
          return this.skipWhile(not(predicate), context);
        },
        sortBy: function sortBy(mapper, comparator) {
          return reify(this, sortFactory(this, comparator, mapper));
        },
        take: function take(amount) {
          return this.slice(0, Math.max(0, amount));
        },
        takeLast: function takeLast(amount) {
          return this.slice(-Math.max(0, amount));
        },
        takeWhile: function takeWhile(predicate, context) {
          return reify(this, takeWhileFactory(this, predicate, context));
        },
        takeUntil: function takeUntil(predicate, context) {
          return this.takeWhile(not(predicate), context);
        },
        update: function update2(fn) {
          return fn(this);
        },
        valueSeq: function valueSeq() {
          return this.toIndexedSeq();
        },
        // ### Hashable Object
        hashCode: function hashCode() {
          return this.__hash || (this.__hash = hashCollection(this));
        }
        // ### Internal
        // abstract __iterate(fn, reverse)
        // abstract __iterator(type, reverse)
      });
      var CollectionPrototype = Collection.prototype;
      CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
      CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
      CollectionPrototype.toJSON = CollectionPrototype.toArray;
      CollectionPrototype.__toStringMapper = quoteString;
      CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
        return this.toString();
      };
      CollectionPrototype.chain = CollectionPrototype.flatMap;
      CollectionPrototype.contains = CollectionPrototype.includes;
      mixin(KeyedCollection, {
        // ### More sequential methods
        flip: function flip() {
          return reify(this, flipFactory(this));
        },
        mapEntries: function mapEntries(mapper, context) {
          var this$1$1 = this;
          var iterations = 0;
          return reify(
            this,
            this.toSeq().map(function(v, k) {
              return mapper.call(context, [k, v], iterations++, this$1$1);
            }).fromEntrySeq()
          );
        },
        mapKeys: function mapKeys(mapper, context) {
          var this$1$1 = this;
          return reify(
            this,
            this.toSeq().flip().map(function(k, v) {
              return mapper.call(context, k, v, this$1$1);
            }).flip()
          );
        }
      });
      var KeyedCollectionPrototype = KeyedCollection.prototype;
      KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
      KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
      KeyedCollectionPrototype.toJSON = toObject;
      KeyedCollectionPrototype.__toStringMapper = function(v, k) {
        return quoteString(k) + ": " + quoteString(v);
      };
      mixin(IndexedCollection, {
        // ### Conversion to other types
        toKeyedSeq: function toKeyedSeq() {
          return new ToKeyedSequence(this, false);
        },
        // ### ES6 Collection methods (ES6 Array and Map)
        filter: function filter(predicate, context) {
          return reify(this, filterFactory(this, predicate, context, false));
        },
        findIndex: function findIndex(predicate, context) {
          var entry = this.findEntry(predicate, context);
          return entry ? entry[0] : -1;
        },
        indexOf: function indexOf(searchValue) {
          var key = this.keyOf(searchValue);
          return key === void 0 ? -1 : key;
        },
        lastIndexOf: function lastIndexOf(searchValue) {
          var key = this.lastKeyOf(searchValue);
          return key === void 0 ? -1 : key;
        },
        reverse: function reverse() {
          return reify(this, reverseFactory(this, false));
        },
        slice: function slice(begin, end) {
          return reify(this, sliceFactory(this, begin, end, false));
        },
        splice: function splice(index, removeNum) {
          var numArgs = arguments.length;
          removeNum = Math.max(removeNum || 0, 0);
          if (numArgs === 0 || numArgs === 2 && !removeNum) {
            return this;
          }
          index = resolveBegin(index, index < 0 ? this.count() : this.size);
          var spliced = this.slice(0, index);
          return reify(
            this,
            numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
          );
        },
        // ### More collection methods
        findLastIndex: function findLastIndex(predicate, context) {
          var entry = this.findLastEntry(predicate, context);
          return entry ? entry[0] : -1;
        },
        first: function first(notSetValue) {
          return this.get(0, notSetValue);
        },
        flatten: function flatten(depth) {
          return reify(this, flattenFactory(this, depth, false));
        },
        get: function get2(index, notSetValue) {
          index = wrapIndex(this, index);
          return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
            return key === index;
          }, void 0, notSetValue);
        },
        has: function has2(index) {
          index = wrapIndex(this, index);
          return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
        },
        interpose: function interpose(separator) {
          return reify(this, interposeFactory(this, separator));
        },
        interleave: function interleave() {
          var collections = [this].concat(arrCopy(arguments));
          var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
          var interleaved = zipped.flatten(true);
          if (zipped.size) {
            interleaved.size = zipped.size * collections.length;
          }
          return reify(this, interleaved);
        },
        keySeq: function keySeq() {
          return Range(0, this.size);
        },
        last: function last(notSetValue) {
          return this.get(-1, notSetValue);
        },
        skipWhile: function skipWhile(predicate, context) {
          return reify(this, skipWhileFactory(this, predicate, context, false));
        },
        zip: function zip() {
          var collections = [this].concat(arrCopy(arguments));
          return reify(this, zipWithFactory(this, defaultZipper, collections));
        },
        zipAll: function zipAll() {
          var collections = [this].concat(arrCopy(arguments));
          return reify(this, zipWithFactory(this, defaultZipper, collections, true));
        },
        zipWith: function zipWith(zipper) {
          var collections = arrCopy(arguments);
          collections[0] = this;
          return reify(this, zipWithFactory(this, zipper, collections));
        }
      });
      var IndexedCollectionPrototype = IndexedCollection.prototype;
      IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
      IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
      mixin(SetCollection, {
        // ### ES6 Collection methods (ES6 Array and Map)
        get: function get2(value, notSetValue) {
          return this.has(value) ? value : notSetValue;
        },
        includes: function includes(value) {
          return this.has(value);
        },
        // ### More sequential methods
        keySeq: function keySeq() {
          return this.valueSeq();
        }
      });
      var SetCollectionPrototype = SetCollection.prototype;
      SetCollectionPrototype.has = CollectionPrototype.includes;
      SetCollectionPrototype.contains = SetCollectionPrototype.includes;
      SetCollectionPrototype.keys = SetCollectionPrototype.values;
      mixin(KeyedSeq, KeyedCollectionPrototype);
      mixin(IndexedSeq, IndexedCollectionPrototype);
      mixin(SetSeq, SetCollectionPrototype);
      function reduce(collection, reducer, reduction, context, useFirst, reverse) {
        assertNotInfinite(collection.size);
        collection.__iterate(function(v, k, c) {
          if (useFirst) {
            useFirst = false;
            reduction = v;
          } else {
            reduction = reducer.call(context, reduction, v, k, c);
          }
        }, reverse);
        return reduction;
      }
      function keyMapper(v, k) {
        return k;
      }
      function entryMapper(v, k) {
        return [k, v];
      }
      function not(predicate) {
        return function() {
          return !predicate.apply(this, arguments);
        };
      }
      function neg(predicate) {
        return function() {
          return -predicate.apply(this, arguments);
        };
      }
      function defaultZipper() {
        return arrCopy(arguments);
      }
      function defaultNegComparator(a, b) {
        return a < b ? 1 : a > b ? -1 : 0;
      }
      function hashCollection(collection) {
        if (collection.size === Infinity) {
          return 0;
        }
        var ordered = isOrdered(collection);
        var keyed = isKeyed(collection);
        var h = ordered ? 1 : 0;
        collection.__iterate(
          keyed ? ordered ? function(v, k) {
            h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
          } : function(v, k) {
            h = h + hashMerge(hash(v), hash(k)) | 0;
          } : ordered ? function(v) {
            h = 31 * h + hash(v) | 0;
          } : function(v) {
            h = h + hash(v) | 0;
          }
        );
        return murmurHashOfSize(collection.size, h);
      }
      function murmurHashOfSize(size, h) {
        h = imul(h, 3432918353);
        h = imul(h << 15 | h >>> -15, 461845907);
        h = imul(h << 13 | h >>> -13, 5);
        h = (h + 3864292196 | 0) ^ size;
        h = imul(h ^ h >>> 16, 2246822507);
        h = imul(h ^ h >>> 13, 3266489909);
        h = smi(h ^ h >>> 16);
        return h;
      }
      function hashMerge(a, b) {
        return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
      }
      var OrderedSet = /* @__PURE__ */ function(Set3) {
        function OrderedSet2(value) {
          return value === void 0 || value === null ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set2) {
            var iter = SetCollection(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v) {
              return set2.add(v);
            });
          });
        }
        if (Set3)
          OrderedSet2.__proto__ = Set3;
        OrderedSet2.prototype = Object.create(Set3 && Set3.prototype);
        OrderedSet2.prototype.constructor = OrderedSet2;
        OrderedSet2.of = function of() {
          return this(arguments);
        };
        OrderedSet2.fromKeys = function fromKeys(value) {
          return this(KeyedCollection(value).keySeq());
        };
        OrderedSet2.prototype.toString = function toString2() {
          return this.__toString("OrderedSet {", "}");
        };
        return OrderedSet2;
      }(Set2);
      OrderedSet.isOrderedSet = isOrderedSet;
      var OrderedSetPrototype = OrderedSet.prototype;
      OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
      OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
      OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
      OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
      OrderedSetPrototype.__empty = emptyOrderedSet;
      OrderedSetPrototype.__make = makeOrderedSet;
      function makeOrderedSet(map, ownerID) {
        var set2 = Object.create(OrderedSetPrototype);
        set2.size = map ? map.size : 0;
        set2._map = map;
        set2.__ownerID = ownerID;
        return set2;
      }
      var EMPTY_ORDERED_SET;
      function emptyOrderedSet() {
        return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
      }
      var PairSorting = {
        LeftThenRight: -1,
        RightThenLeft: 1
      };
      function throwOnInvalidDefaultValues(defaultValues) {
        if (isRecord(defaultValues)) {
          throw new Error(
            "Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead."
          );
        }
        if (isImmutable(defaultValues)) {
          throw new Error(
            "Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead."
          );
        }
        if (defaultValues === null || typeof defaultValues !== "object") {
          throw new Error(
            "Can not call `Record` with a non-object as default values. Use a plain javascript object instead."
          );
        }
      }
      var Record2 = function Record3(defaultValues, name) {
        var hasInitialized;
        throwOnInvalidDefaultValues(defaultValues);
        var RecordType = function Record4(values) {
          var this$1$1 = this;
          if (values instanceof RecordType) {
            return values;
          }
          if (!(this instanceof RecordType)) {
            return new RecordType(values);
          }
          if (!hasInitialized) {
            hasInitialized = true;
            var keys = Object.keys(defaultValues);
            var indices = RecordTypePrototype._indices = {};
            RecordTypePrototype._name = name;
            RecordTypePrototype._keys = keys;
            RecordTypePrototype._defaultValues = defaultValues;
            for (var i = 0; i < keys.length; i++) {
              var propName = keys[i];
              indices[propName] = i;
              if (RecordTypePrototype[propName]) {
                typeof console === "object" && console.warn && console.warn(
                  "Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.'
                );
              } else {
                setProp(RecordTypePrototype, propName);
              }
            }
          }
          this.__ownerID = void 0;
          this._values = List().withMutations(function(l) {
            l.setSize(this$1$1._keys.length);
            KeyedCollection(values).forEach(function(v, k) {
              l.set(this$1$1._indices[k], v === this$1$1._defaultValues[k] ? void 0 : v);
            });
          });
          return this;
        };
        var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
        RecordTypePrototype.constructor = RecordType;
        if (name) {
          RecordType.displayName = name;
        }
        return RecordType;
      };
      Record2.prototype.toString = function toString2() {
        var str = recordName(this) + " { ";
        var keys = this._keys;
        var k;
        for (var i = 0, l = keys.length; i !== l; i++) {
          k = keys[i];
          str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
        }
        return str + " }";
      };
      Record2.prototype.equals = function equals(other) {
        return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
      };
      Record2.prototype.hashCode = function hashCode() {
        return recordSeq(this).hashCode();
      };
      Record2.prototype.has = function has2(k) {
        return this._indices.hasOwnProperty(k);
      };
      Record2.prototype.get = function get2(k, notSetValue) {
        if (!this.has(k)) {
          return notSetValue;
        }
        var index = this._indices[k];
        var value = this._values.get(index);
        return value === void 0 ? this._defaultValues[k] : value;
      };
      Record2.prototype.set = function set2(k, v) {
        if (this.has(k)) {
          var newValues = this._values.set(
            this._indices[k],
            v === this._defaultValues[k] ? void 0 : v
          );
          if (newValues !== this._values && !this.__ownerID) {
            return makeRecord(this, newValues);
          }
        }
        return this;
      };
      Record2.prototype.remove = function remove2(k) {
        return this.set(k);
      };
      Record2.prototype.clear = function clear() {
        var newValues = this._values.clear().setSize(this._keys.length);
        return this.__ownerID ? this : makeRecord(this, newValues);
      };
      Record2.prototype.wasAltered = function wasAltered2() {
        return this._values.wasAltered();
      };
      Record2.prototype.toSeq = function toSeq() {
        return recordSeq(this);
      };
      Record2.prototype.toJS = function toJS$1() {
        return toJS(this);
      };
      Record2.prototype.entries = function entries() {
        return this.__iterator(ITERATE_ENTRIES);
      };
      Record2.prototype.__iterator = function __iterator(type, reverse) {
        return recordSeq(this).__iterator(type, reverse);
      };
      Record2.prototype.__iterate = function __iterate(fn, reverse) {
        return recordSeq(this).__iterate(fn, reverse);
      };
      Record2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newValues = this._values.__ensureOwner(ownerID);
        if (!ownerID) {
          this.__ownerID = ownerID;
          this._values = newValues;
          return this;
        }
        return makeRecord(this, newValues, ownerID);
      };
      Record2.isRecord = isRecord;
      Record2.getDescriptiveName = recordName;
      var RecordPrototype = Record2.prototype;
      RecordPrototype[IS_RECORD_SYMBOL] = true;
      RecordPrototype[DELETE] = RecordPrototype.remove;
      RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
      RecordPrototype.getIn = getIn;
      RecordPrototype.hasIn = CollectionPrototype.hasIn;
      RecordPrototype.merge = merge$1;
      RecordPrototype.mergeWith = mergeWith$1;
      RecordPrototype.mergeIn = mergeIn;
      RecordPrototype.mergeDeep = mergeDeep;
      RecordPrototype.mergeDeepWith = mergeDeepWith;
      RecordPrototype.mergeDeepIn = mergeDeepIn;
      RecordPrototype.setIn = setIn;
      RecordPrototype.update = update;
      RecordPrototype.updateIn = updateIn;
      RecordPrototype.withMutations = withMutations;
      RecordPrototype.asMutable = asMutable;
      RecordPrototype.asImmutable = asImmutable;
      RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
      RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
      RecordPrototype.inspect = RecordPrototype.toSource = function() {
        return this.toString();
      };
      function makeRecord(likeRecord, values, ownerID) {
        var record = Object.create(Object.getPrototypeOf(likeRecord));
        record._values = values;
        record.__ownerID = ownerID;
        return record;
      }
      function recordName(record) {
        return record.constructor.displayName || record.constructor.name || "Record";
      }
      function recordSeq(record) {
        return keyedSeqFromValue(record._keys.map(function(k) {
          return [k, record.get(k)];
        }));
      }
      function setProp(prototype, name) {
        try {
          Object.defineProperty(prototype, name, {
            get: function() {
              return this.get(name);
            },
            set: function(value) {
              invariant(this.__ownerID, "Cannot set on an immutable record.");
              this.set(name, value);
            }
          });
        } catch (error) {
        }
      }
      var Repeat = /* @__PURE__ */ function(IndexedSeq2) {
        function Repeat2(value, times) {
          if (!(this instanceof Repeat2)) {
            return new Repeat2(value, times);
          }
          this._value = value;
          this.size = times === void 0 ? Infinity : Math.max(0, times);
          if (this.size === 0) {
            if (EMPTY_REPEAT) {
              return EMPTY_REPEAT;
            }
            EMPTY_REPEAT = this;
          }
        }
        if (IndexedSeq2)
          Repeat2.__proto__ = IndexedSeq2;
        Repeat2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        Repeat2.prototype.constructor = Repeat2;
        Repeat2.prototype.toString = function toString2() {
          if (this.size === 0) {
            return "Repeat []";
          }
          return "Repeat [ " + this._value + " " + this.size + " times ]";
        };
        Repeat2.prototype.get = function get2(index, notSetValue) {
          return this.has(index) ? this._value : notSetValue;
        };
        Repeat2.prototype.includes = function includes(searchValue) {
          return is(this._value, searchValue);
        };
        Repeat2.prototype.slice = function slice(begin, end) {
          var size = this.size;
          return wholeSlice(begin, end, size) ? this : new Repeat2(
            this._value,
            resolveEnd(end, size) - resolveBegin(begin, size)
          );
        };
        Repeat2.prototype.reverse = function reverse() {
          return this;
        };
        Repeat2.prototype.indexOf = function indexOf(searchValue) {
          if (is(this._value, searchValue)) {
            return 0;
          }
          return -1;
        };
        Repeat2.prototype.lastIndexOf = function lastIndexOf(searchValue) {
          if (is(this._value, searchValue)) {
            return this.size;
          }
          return -1;
        };
        Repeat2.prototype.__iterate = function __iterate(fn, reverse) {
          var size = this.size;
          var i = 0;
          while (i !== size) {
            if (fn(this._value, reverse ? size - ++i : i++, this) === false) {
              break;
            }
          }
          return i;
        };
        Repeat2.prototype.__iterator = function __iterator(type, reverse) {
          var this$1$1 = this;
          var size = this.size;
          var i = 0;
          return new Iterator(
            function() {
              return i === size ? iteratorDone() : iteratorValue(type, reverse ? size - ++i : i++, this$1$1._value);
            }
          );
        };
        Repeat2.prototype.equals = function equals(other) {
          return other instanceof Repeat2 ? is(this._value, other._value) : deepEqual(this, other);
        };
        return Repeat2;
      }(IndexedSeq);
      var EMPTY_REPEAT;
      function fromJS(value, converter) {
        return fromJSWith(
          [],
          converter || defaultConverter,
          value,
          "",
          converter && converter.length > 2 ? [] : void 0,
          { "": value }
        );
      }
      function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
        if (typeof value !== "string" && !isImmutable(value) && (isArrayLike(value) || hasIterator(value) || isPlainObject(value))) {
          if (~stack.indexOf(value)) {
            throw new TypeError("Cannot convert circular structure to Immutable");
          }
          stack.push(value);
          keyPath && key !== "" && keyPath.push(key);
          var converted = converter.call(
            parentValue,
            key,
            Seq(value).map(
              function(v, k) {
                return fromJSWith(stack, converter, v, k, keyPath, value);
              }
            ),
            keyPath && keyPath.slice()
          );
          stack.pop();
          keyPath && keyPath.pop();
          return converted;
        }
        return value;
      }
      function defaultConverter(k, v) {
        return isIndexed(v) ? v.toList() : isKeyed(v) ? v.toMap() : v.toSet();
      }
      var version = "5.0.3";
      var Iterable = Collection;
      exports3.Collection = Collection;
      exports3.Iterable = Iterable;
      exports3.List = List;
      exports3.Map = Map2;
      exports3.OrderedMap = OrderedMap;
      exports3.OrderedSet = OrderedSet;
      exports3.PairSorting = PairSorting;
      exports3.Range = Range;
      exports3.Record = Record2;
      exports3.Repeat = Repeat;
      exports3.Seq = Seq;
      exports3.Set = Set2;
      exports3.Stack = Stack;
      exports3.fromJS = fromJS;
      exports3.get = get;
      exports3.getIn = getIn$1;
      exports3.has = has;
      exports3.hasIn = hasIn$1;
      exports3.hash = hash;
      exports3.is = is;
      exports3.isAssociative = isAssociative;
      exports3.isCollection = isCollection;
      exports3.isImmutable = isImmutable;
      exports3.isIndexed = isIndexed;
      exports3.isKeyed = isKeyed;
      exports3.isList = isList;
      exports3.isMap = isMap;
      exports3.isOrdered = isOrdered;
      exports3.isOrderedMap = isOrderedMap;
      exports3.isOrderedSet = isOrderedSet;
      exports3.isPlainObject = isPlainObject;
      exports3.isRecord = isRecord;
      exports3.isSeq = isSeq;
      exports3.isSet = isSet;
      exports3.isStack = isStack;
      exports3.isValueObject = isValueObject;
      exports3.merge = merge;
      exports3.mergeDeep = mergeDeep$1;
      exports3.mergeDeepWith = mergeDeepWith$1;
      exports3.mergeWith = mergeWith;
      exports3.remove = remove;
      exports3.removeIn = removeIn;
      exports3.set = set;
      exports3.setIn = setIn$1;
      exports3.update = update$1;
      exports3.updateIn = updateIn$1;
      exports3.version = version;
    });
  }
});

// simulation.worker.ts
var import_worker_threads = require("worker_threads");

// ../uma-tools/components/HorseDefTypes.ts
var import_immutable = __toESM(require_immutable());

// ../uma-tools/umalator-global/skill_meta.json
var skill_meta_default = { "100011": { baseCost: 0, groupId: "10001", iconId: "20013", order: 10 }, "100021": { baseCost: 0, groupId: "10002", iconId: "20013", order: 10 }, "100031": { baseCost: 0, groupId: "10003", iconId: "20013", order: 10 }, "100041": { baseCost: 0, groupId: "10004", iconId: "20043", order: 10 }, "100051": { baseCost: 0, groupId: "10005", iconId: "20013", order: 10 }, "100061": { baseCost: 0, groupId: "10006", iconId: "20013", order: 10 }, "100071": { baseCost: 0, groupId: "10007", iconId: "20013", order: 10 }, "100081": { baseCost: 0, groupId: "10008", iconId: "20013", order: 10 }, "100091": { baseCost: 0, groupId: "10009", iconId: "20013", order: 10 }, "100101": { baseCost: 0, groupId: "10010", iconId: "20043", order: 10 }, "100111": { baseCost: 0, groupId: "10011", iconId: "20013", order: 10 }, "100121": { baseCost: 0, groupId: "10012", iconId: "20013", order: 10 }, "100131": { baseCost: 0, groupId: "10013", iconId: "20013", order: 10 }, "100141": { baseCost: 0, groupId: "10014", iconId: "20013", order: 10 }, "100151": { baseCost: 0, groupId: "10015", iconId: "20013", order: 10 }, "100161": { baseCost: 0, groupId: "10016", iconId: "20013", order: 10 }, "100171": { baseCost: 0, groupId: "10017", iconId: "20013", order: 10 }, "100181": { baseCost: 0, groupId: "10018", iconId: "20013", order: 10 }, "100191": { baseCost: 0, groupId: "10019", iconId: "20013", order: 10 }, "100201": { baseCost: 0, groupId: "10020", iconId: "20043", order: 10 }, "100231": { baseCost: 0, groupId: "10023", iconId: "20013", order: 10 }, "100241": { baseCost: 0, groupId: "10024", iconId: "20013", order: 10 }, "100261": { baseCost: 0, groupId: "10026", iconId: "20013", order: 10 }, "100271": { baseCost: 0, groupId: "10027", iconId: "20043", order: 10 }, "100281": { baseCost: 0, groupId: "10028", iconId: "20013", order: 10 }, "100301": { baseCost: 0, groupId: "10030", iconId: "20013", order: 10 }, "100321": { baseCost: 0, groupId: "10032", iconId: "20023", order: 10 }, "100351": { baseCost: 0, groupId: "10035", iconId: "20013", order: 10 }, "100371": { baseCost: 0, groupId: "10037", iconId: "20013", order: 10 }, "100381": { baseCost: 0, groupId: "10038", iconId: "20013", order: 10 }, "100391": { baseCost: 0, groupId: "10039", iconId: "20013", order: 10 }, "100401": { baseCost: 0, groupId: "10040", iconId: "20043", order: 10 }, "100411": { baseCost: 0, groupId: "10041", iconId: "20013", order: 10 }, "100451": { baseCost: 0, groupId: "10045", iconId: "20023", order: 10 }, "100461": { baseCost: 0, groupId: "10046", iconId: "20013", order: 10 }, "100501": { baseCost: 0, groupId: "10050", iconId: "20013", order: 10 }, "100521": { baseCost: 0, groupId: "10052", iconId: "20023", order: 10 }, "100561": { baseCost: 0, groupId: "10056", iconId: "20013", order: 10 }, "100581": { baseCost: 0, groupId: "10058", iconId: "20013", order: 10 }, "100601": { baseCost: 0, groupId: "10060", iconId: "20013", order: 10 }, "100611": { baseCost: 0, groupId: "10061", iconId: "20013", order: 10 }, "10071": { baseCost: 0, groupId: "1007", iconId: "20013", order: 10 }, "10081": { baseCost: 0, groupId: "1008", iconId: "20013", order: 10 }, "10091": { baseCost: 0, groupId: "1009", iconId: "20013", order: 10 }, "10111": { baseCost: 0, groupId: "1011", iconId: "20013", order: 10 }, "10141": { baseCost: 0, groupId: "1014", iconId: "20013", order: 10 }, "10181": { baseCost: 0, groupId: "1018", iconId: "20013", order: 10 }, "10241": { baseCost: 0, groupId: "1024", iconId: "20013", order: 10 }, "10271": { baseCost: 0, groupId: "1027", iconId: "20043", order: 10 }, "10321": { baseCost: 0, groupId: "1032", iconId: "20023", order: 10 }, "10351": { baseCost: 0, groupId: "1035", iconId: "20013", order: 10 }, "10411": { baseCost: 0, groupId: "1041", iconId: "20013", order: 10 }, "10451": { baseCost: 0, groupId: "1045", iconId: "20023", order: 10 }, "10521": { baseCost: 0, groupId: "1052", iconId: "20023", order: 10 }, "10561": { baseCost: 0, groupId: "1056", iconId: "20013", order: 10 }, "10601": { baseCost: 0, groupId: "1060", iconId: "20013", order: 10 }, "10611": { baseCost: 0, groupId: "1061", iconId: "20013", order: 10 }, "110011": { baseCost: 0, groupId: "11001", iconId: "20023", order: 10 }, "110031": { baseCost: 0, groupId: "11003", iconId: "20013", order: 10 }, "110041": { baseCost: 0, groupId: "11004", iconId: "20013", order: 10 }, "110111": { baseCost: 0, groupId: "11011", iconId: "20023", order: 10 }, "110131": { baseCost: 0, groupId: "11013", iconId: "20013", order: 10 }, "110141": { baseCost: 0, groupId: "11014", iconId: "20043", order: 10 }, "110181": { baseCost: 0, groupId: "11018", iconId: "20013", order: 10 }, "110241": { baseCost: 0, groupId: "11024", iconId: "20013", order: 10 }, "110301": { baseCost: 0, groupId: "11030", iconId: "20023", order: 10 }, "110451": { baseCost: 0, groupId: "11045", iconId: "20013", order: 10 }, "110561": { baseCost: 0, groupId: "11056", iconId: "20013", order: 10 }, "200011": { baseCost: 110, groupId: "20001", iconId: "10011", order: 1005 }, "200012": { baseCost: 90, groupId: "20001", iconId: "10011", order: 1010 }, "200013": { baseCost: 50, groupId: "20001", iconId: "10014", order: 1020 }, "200021": { baseCost: 110, groupId: "20002", iconId: "10011", order: 1030 }, "200022": { baseCost: 90, groupId: "20002", iconId: "10011", order: 1040 }, "200023": { baseCost: 50, groupId: "20002", iconId: "10014", order: 1050 }, "200031": { baseCost: 110, groupId: "20003", iconId: "10021", order: 1060 }, "200032": { baseCost: 90, groupId: "20003", iconId: "10021", order: 1070 }, "200033": { baseCost: 50, groupId: "20003", iconId: "10024", order: 1080 }, "200041": { baseCost: 110, groupId: "20004", iconId: "10021", order: 1090 }, "200042": { baseCost: 90, groupId: "20004", iconId: "10021", order: 1100 }, "200043": { baseCost: 50, groupId: "20004", iconId: "10024", order: 1110 }, "200051": { baseCost: 110, groupId: "20005", iconId: "10021", order: 1120 }, "200052": { baseCost: 90, groupId: "20005", iconId: "10021", order: 1130 }, "200053": { baseCost: 50, groupId: "20005", iconId: "10024", order: 1140 }, "200061": { baseCost: 110, groupId: "20006", iconId: "10021", order: 1150 }, "200062": { baseCost: 90, groupId: "20006", iconId: "10021", order: 1160 }, "200063": { baseCost: 50, groupId: "20006", iconId: "10024", order: 1170 }, "200071": { baseCost: 110, groupId: "20007", iconId: "10021", order: 1180 }, "200072": { baseCost: 90, groupId: "20007", iconId: "10021", order: 1190 }, "200073": { baseCost: 50, groupId: "20007", iconId: "10024", order: 1200 }, "200081": { baseCost: 90, groupId: "20008", iconId: "10021", order: 1210 }, "200082": { baseCost: 70, groupId: "20008", iconId: "10021", order: 1220 }, "200083": { baseCost: 40, groupId: "20008", iconId: "10024", order: 1230 }, "200091": { baseCost: 90, groupId: "20009", iconId: "10021", order: 1240 }, "200092": { baseCost: 70, groupId: "20009", iconId: "10021", order: 1250 }, "200093": { baseCost: 40, groupId: "20009", iconId: "10024", order: 1260 }, "200101": { baseCost: 90, groupId: "20010", iconId: "10021", order: 1270 }, "200102": { baseCost: 70, groupId: "20010", iconId: "10021", order: 1280 }, "200103": { baseCost: 40, groupId: "20010", iconId: "10024", order: 1290 }, "200111": { baseCost: 90, groupId: "20011", iconId: "10021", order: 1300 }, "200112": { baseCost: 70, groupId: "20011", iconId: "10021", order: 1310 }, "200113": { baseCost: 40, groupId: "20011", iconId: "10024", order: 1320 }, "200121": { baseCost: 90, groupId: "20012", iconId: "10021", order: 1330 }, "200122": { baseCost: 70, groupId: "20012", iconId: "10021", order: 1340 }, "200123": { baseCost: 40, groupId: "20012", iconId: "10024", order: 1350 }, "200131": { baseCost: 110, groupId: "20013", iconId: "10021", order: 1390 }, "200132": { baseCost: 90, groupId: "20013", iconId: "10021", order: 1400 }, "200133": { baseCost: 50, groupId: "20013", iconId: "10024", order: 1410 }, "200141": { baseCost: 110, groupId: "20014", iconId: "10021", order: 1420 }, "200142": { baseCost: 90, groupId: "20014", iconId: "10021", order: 1430 }, "200143": { baseCost: 50, groupId: "20014", iconId: "10024", order: 1440 }, "200151": { baseCost: 110, groupId: "20015", iconId: "10031", order: 1450 }, "200152": { baseCost: 90, groupId: "20015", iconId: "10031", order: 1460 }, "200153": { baseCost: 50, groupId: "20015", iconId: "10034", order: 1470 }, "200161": { baseCost: 110, groupId: "20016", iconId: "10031", order: 1480 }, "200162": { baseCost: 90, groupId: "20016", iconId: "10031", order: 1490 }, "200163": { baseCost: 50, groupId: "20016", iconId: "10034", order: 1500 }, "200171": { baseCost: 110, groupId: "20017", iconId: "10011", order: 1510 }, "200172": { baseCost: 90, groupId: "20017", iconId: "10011", order: 1520 }, "200173": { baseCost: 50, groupId: "20017", iconId: "10014", order: 1530 }, "200181": { baseCost: 110, groupId: "20018", iconId: "10011", order: 1540 }, "200182": { baseCost: 90, groupId: "20018", iconId: "10011", order: 1550 }, "200183": { baseCost: 50, groupId: "20018", iconId: "10014", order: 1560 }, "200191": { baseCost: 110, groupId: "20019", iconId: "10011", order: 1570 }, "200192": { baseCost: 90, groupId: "20019", iconId: "10011", order: 1580 }, "200193": { baseCost: 50, groupId: "20019", iconId: "10014", order: 1590 }, "200201": { baseCost: 110, groupId: "20020", iconId: "10011", order: 1600 }, "200202": { baseCost: 90, groupId: "20020", iconId: "10011", order: 1610 }, "200203": { baseCost: 50, groupId: "20020", iconId: "10014", order: 1620 }, "200211": { baseCost: 110, groupId: "20021", iconId: "10041", order: 1630 }, "200212": { baseCost: 90, groupId: "20021", iconId: "10041", order: 1640 }, "200221": { baseCost: 110, groupId: "20022", iconId: "10041", order: 1650 }, "200222": { baseCost: 90, groupId: "20022", iconId: "10041", order: 1660 }, "200231": { baseCost: 110, groupId: "20023", iconId: "10041", order: 1670 }, "200232": { baseCost: 90, groupId: "20023", iconId: "10041", order: 1680 }, "200233": { baseCost: 50, groupId: "20023", iconId: "10044", order: 1690 }, "200241": { baseCost: 110, groupId: "20024", iconId: "10041", order: 1700 }, "200242": { baseCost: 90, groupId: "20024", iconId: "10041", order: 1710 }, "200251": { baseCost: 110, groupId: "20025", iconId: "10051", order: 1720 }, "200252": { baseCost: 90, groupId: "20025", iconId: "10051", order: 1730 }, "200253": { baseCost: 50, groupId: "20025", iconId: "10054", order: 1740 }, "200261": { baseCost: 110, groupId: "20026", iconId: "10011", order: 1750 }, "200262": { baseCost: 90, groupId: "20026", iconId: "10011", order: 1760 }, "200263": { baseCost: 50, groupId: "20026", iconId: "10014", order: 1770 }, "200271": { baseCost: 110, groupId: "20027", iconId: "10011", order: 1780 }, "200272": { baseCost: 90, groupId: "20027", iconId: "10011", order: 1790 }, "200281": { baseCost: 110, groupId: "20028", iconId: "10031", order: 1800 }, "200282": { baseCost: 90, groupId: "20028", iconId: "10031", order: 1810 }, "200283": { baseCost: 50, groupId: "20028", iconId: "10034", order: 1820 }, "200291": { baseCost: 110, groupId: "20029", iconId: "10041", order: 1830 }, "200292": { baseCost: 90, groupId: "20029", iconId: "10041", order: 1840 }, "200301": { baseCost: 110, groupId: "20030", iconId: "10011", order: 1850 }, "200302": { baseCost: 90, groupId: "20030", iconId: "10011", order: 1860 }, "200311": { baseCost: 50, groupId: "20031", iconId: "10014", order: 1870 }, "200321": { baseCost: 50, groupId: "20032", iconId: "10024", order: 1880 }, "200331": { baseCost: 180, groupId: "20033", iconId: "20012", order: 1890 }, "200332": { baseCost: 180, groupId: "20033", iconId: "20011", order: 1900 }, "200333": { baseCost: 100, groupId: "20033", iconId: "20014", order: 1910 }, "200341": { baseCost: 180, groupId: "20034", iconId: "20042", order: 1920 }, "200342": { baseCost: 180, groupId: "20034", iconId: "20041", order: 1930 }, "200343": { baseCost: 100, groupId: "20034", iconId: "20044", order: 1940 }, "200351": { baseCost: 170, groupId: "20035", iconId: "20022", order: 1950 }, "200352": { baseCost: 170, groupId: "20035", iconId: "20021", order: 1960 }, "200353": { baseCost: 100, groupId: "20035", iconId: "20024", order: 1970 }, "200361": { baseCost: 170, groupId: "20036", iconId: "20012", order: 1980 }, "200362": { baseCost: 170, groupId: "20036", iconId: "20011", order: 1990 }, "200371": { baseCost: 170, groupId: "20037", iconId: "20042", order: 2e3 }, "200372": { baseCost: 170, groupId: "20037", iconId: "20041", order: 2010 }, "200381": { baseCost: 170, groupId: "20038", iconId: "20022", order: 2020 }, "200382": { baseCost: 170, groupId: "20038", iconId: "20021", order: 2030 }, "200391": { baseCost: 100, groupId: "20039", iconId: "20024", order: 2040 }, "200401": { baseCost: 100, groupId: "20040", iconId: "20024", order: 2050 }, "200411": { baseCost: 100, groupId: "20041", iconId: "20014", order: 2060 }, "200421": { baseCost: 100, groupId: "20042", iconId: "20014", order: 2070 }, "200431": { baseCost: 140, groupId: "20043", iconId: "20062", order: 2080 }, "200432": { baseCost: 140, groupId: "20043", iconId: "20061", order: 2090 }, "200433": { baseCost: 70, groupId: "20043", iconId: "20064", order: 2100 }, "200441": { baseCost: 160, groupId: "20044", iconId: "20022", order: 2110 }, "200442": { baseCost: 160, groupId: "20044", iconId: "20021", order: 2120 }, "200451": { baseCost: 120, groupId: "20045", iconId: "20052", order: 2130 }, "200452": { baseCost: 120, groupId: "20045", iconId: "20051", order: 2140 }, "200461": { baseCost: 170, groupId: "20046", iconId: "20012", order: 2150 }, "200462": { baseCost: 170, groupId: "20046", iconId: "20011", order: 2160 }, "200471": { baseCost: 170, groupId: "20047", iconId: "20022", order: 2170 }, "200472": { baseCost: 170, groupId: "20047", iconId: "20021", order: 2180 }, "200481": { baseCost: 170, groupId: "20048", iconId: "20022", order: 2190 }, "200482": { baseCost: 170, groupId: "20048", iconId: "20021", order: 2200 }, "200491": { baseCost: 150, groupId: "20049", iconId: "20042", order: 2210 }, "200492": { baseCost: 150, groupId: "20049", iconId: "20041", order: 2220 }, "200501": { baseCost: 120, groupId: "20050", iconId: "20052", order: 2230 }, "200502": { baseCost: 120, groupId: "20050", iconId: "20051", order: 2240 }, "200511": { baseCost: 170, groupId: "20051", iconId: "20012", order: 2250 }, "200512": { baseCost: 170, groupId: "20051", iconId: "20011", order: 2260 }, "200521": { baseCost: 100, groupId: "20052", iconId: "20024", order: 2270 }, "200531": { baseCost: 120, groupId: "20053", iconId: "20042", order: 2280 }, "200532": { baseCost: 120, groupId: "20053", iconId: "20041", order: 2290 }, "200541": { baseCost: 180, groupId: "20054", iconId: "20012", order: 2300 }, "200542": { baseCost: 180, groupId: "20054", iconId: "20011", order: 2310 }, "200551": { baseCost: 180, groupId: "20055", iconId: "20042", order: 2320 }, "200552": { baseCost: 180, groupId: "20055", iconId: "20041", order: 2330 }, "200561": { baseCost: 180, groupId: "20056", iconId: "20022", order: 2340 }, "200562": { baseCost: 180, groupId: "20056", iconId: "20021", order: 2350 }, "200571": { baseCost: 180, groupId: "20057", iconId: "20022", order: 2360 }, "200572": { baseCost: 180, groupId: "20057", iconId: "20021", order: 2370 }, "200581": { baseCost: 180, groupId: "20058", iconId: "20012", order: 2380 }, "200582": { baseCost: 180, groupId: "20058", iconId: "20011", order: 2390 }, "200591": { baseCost: 180, groupId: "20059", iconId: "20012", order: 2400 }, "200592": { baseCost: 180, groupId: "20059", iconId: "20011", order: 2410 }, "200601": { baseCost: 180, groupId: "20060", iconId: "20042", order: 2420 }, "200602": { baseCost: 180, groupId: "20060", iconId: "20041", order: 2430 }, "200611": { baseCost: 180, groupId: "20061", iconId: "20012", order: 2440 }, "200612": { baseCost: 180, groupId: "20061", iconId: "20011", order: 2450 }, "200621": { baseCost: 180, groupId: "20062", iconId: "20022", order: 2460 }, "200622": { baseCost: 180, groupId: "20062", iconId: "20021", order: 2470 }, "200631": { baseCost: 180, groupId: "20063", iconId: "20012", order: 2480 }, "200632": { baseCost: 180, groupId: "20063", iconId: "20011", order: 2490 }, "200641": { baseCost: 180, groupId: "20064", iconId: "20042", order: 2500 }, "200642": { baseCost: 180, groupId: "20064", iconId: "20041", order: 2510 }, "200651": { baseCost: 160, groupId: "20065", iconId: "20042", order: 2520 }, "200652": { baseCost: 160, groupId: "20065", iconId: "20041", order: 2530 }, "200662": { baseCost: 160, groupId: "20066", iconId: "20021", order: 2550 }, "200671": { baseCost: 160, groupId: "20067", iconId: "20012", order: 2560 }, "200672": { baseCost: 160, groupId: "20067", iconId: "20011", order: 2570 }, "200681": { baseCost: 160, groupId: "20068", iconId: "20012", order: 2580 }, "200682": { baseCost: 160, groupId: "20068", iconId: "20011", order: 2590 }, "200691": { baseCost: 160, groupId: "20069", iconId: "20022", order: 2600 }, "200692": { baseCost: 160, groupId: "20069", iconId: "20021", order: 2610 }, "200701": { baseCost: 160, groupId: "20070", iconId: "20042", order: 2620 }, "200702": { baseCost: 160, groupId: "20070", iconId: "20041", order: 2630 }, "200711": { baseCost: 160, groupId: "20071", iconId: "20022", order: 2640 }, "200712": { baseCost: 160, groupId: "20071", iconId: "20021", order: 2650 }, "200721": { baseCost: 160, groupId: "20072", iconId: "20012", order: 2660 }, "200722": { baseCost: 160, groupId: "20072", iconId: "20011", order: 2670 }, "200731": { baseCost: 160, groupId: "20073", iconId: "20012", order: 2680 }, "200732": { baseCost: 160, groupId: "20073", iconId: "20011", order: 2690 }, "200741": { baseCost: 160, groupId: "20074", iconId: "20022", order: 2700 }, "200742": { baseCost: 160, groupId: "20074", iconId: "20021", order: 2710 }, "200751": { baseCost: 160, groupId: "20075", iconId: "20012", order: 2720 }, "200752": { baseCost: 160, groupId: "20075", iconId: "20011", order: 2730 }, "200761": { baseCost: 160, groupId: "20076", iconId: "20022", order: 2740 }, "200762": { baseCost: 160, groupId: "20076", iconId: "20021", order: 2750 }, "200771": { baseCost: 140, groupId: "20077", iconId: "30051", order: 2760 }, "200772": { baseCost: 140, groupId: "20077", iconId: "30052", order: 2755 }, "200781": { baseCost: 140, groupId: "20078", iconId: "30051", order: 2770 }, "200791": { baseCost: 130, groupId: "20079", iconId: "30041", order: 2780 }, "200801": { baseCost: 130, groupId: "20080", iconId: "30041", order: 2790 }, "200811": { baseCost: 130, groupId: "20081", iconId: "30041", order: 2800 }, "200821": { baseCost: 130, groupId: "20082", iconId: "30041", order: 2810 }, "200831": { baseCost: 130, groupId: "20083", iconId: "30051", order: 2820 }, "200841": { baseCost: 130, groupId: "20084", iconId: "30051", order: 2830 }, "200851": { baseCost: 130, groupId: "20085", iconId: "30011", order: 2840 }, "200861": { baseCost: 130, groupId: "20086", iconId: "30051", order: 2850 }, "200871": { baseCost: 130, groupId: "20087", iconId: "30051", order: 2860 }, "200881": { baseCost: 130, groupId: "20088", iconId: "30011", order: 2870 }, "200891": { baseCost: 130, groupId: "20089", iconId: "30051", order: 2880 }, "200901": { baseCost: 130, groupId: "20090", iconId: "30051", order: 2890 }, "200911": { baseCost: 130, groupId: "20091", iconId: "30011", order: 2900 }, "200921": { baseCost: 130, groupId: "20092", iconId: "30051", order: 2910 }, "200931": { baseCost: 130, groupId: "20093", iconId: "30051", order: 2920 }, "200941": { baseCost: 130, groupId: "20094", iconId: "30011", order: 2930 }, "200951": { baseCost: 110, groupId: "20095", iconId: "10021", order: 1360 }, "200952": { baseCost: 90, groupId: "20095", iconId: "10021", order: 1370 }, "200953": { baseCost: 50, groupId: "20095", iconId: "10024", order: 1380 }, "200961": { baseCost: 110, groupId: "20096", iconId: "20011", order: 20010 }, "200962": { baseCost: 100, groupId: "20096", iconId: "20011", order: 20020 }, "200971": { baseCost: 110, groupId: "20097", iconId: "20011", order: 20030 }, "200972": { baseCost: 100, groupId: "20097", iconId: "20011", order: 20040 }, "200981": { baseCost: 170, groupId: "20098", iconId: "20012", order: 20050 }, "200982": { baseCost: 170, groupId: "20098", iconId: "20011", order: 20060 }, "200991": { baseCost: 160, groupId: "20099", iconId: "20042", order: 20070 }, "200992": { baseCost: 160, groupId: "20099", iconId: "20041", order: 20080 }, "201001": { baseCost: 140, groupId: "20100", iconId: "20052", order: 20090 }, "201002": { baseCost: 140, groupId: "20100", iconId: "20051", order: 20100 }, "201011": { baseCost: 170, groupId: "20101", iconId: "30012", order: 20110 }, "201012": { baseCost: 170, groupId: "20101", iconId: "30011", order: 20120 }, "201021": { baseCost: 170, groupId: "20102", iconId: "30052", order: 20130 }, "201022": { baseCost: 170, groupId: "20102", iconId: "30051", order: 20140 }, "201031": { baseCost: 110, groupId: "20103", iconId: "20011", order: 20150 }, "201032": { baseCost: 100, groupId: "20103", iconId: "20011", order: 20160 }, "201041": { baseCost: 110, groupId: "20104", iconId: "20011", order: 20170 }, "201042": { baseCost: 100, groupId: "20104", iconId: "20011", order: 20180 }, "201051": { baseCost: 160, groupId: "20105", iconId: "20012", order: 20190 }, "201052": { baseCost: 160, groupId: "20105", iconId: "20011", order: 20200 }, "201061": { baseCost: 160, groupId: "20106", iconId: "20042", order: 20210 }, "201062": { baseCost: 160, groupId: "20106", iconId: "20041", order: 20220 }, "201071": { baseCost: 120, groupId: "20107", iconId: "20012", order: 20230 }, "201072": { baseCost: 120, groupId: "20107", iconId: "20011", order: 20240 }, "201081": { baseCost: 160, groupId: "20108", iconId: "30012", order: 20250 }, "201082": { baseCost: 160, groupId: "20108", iconId: "30011", order: 20260 }, "201091": { baseCost: 160, groupId: "20109", iconId: "30022", order: 20270 }, "201092": { baseCost: 160, groupId: "20109", iconId: "30021", order: 20280 }, "201101": { baseCost: 110, groupId: "20110", iconId: "20011", order: 20300 }, "201102": { baseCost: 100, groupId: "20110", iconId: "20011", order: 20310 }, "201111": { baseCost: 110, groupId: "20111", iconId: "20011", order: 20320 }, "201112": { baseCost: 100, groupId: "20111", iconId: "20011", order: 20330 }, "201121": { baseCost: 110, groupId: "20112", iconId: "20092", order: 20340 }, "201122": { baseCost: 110, groupId: "20112", iconId: "20091", order: 20350 }, "201131": { baseCost: 140, groupId: "20113", iconId: "20052", order: 20360 }, "201132": { baseCost: 140, groupId: "20113", iconId: "20051", order: 20370 }, "201141": { baseCost: 160, groupId: "20114", iconId: "20022", order: 20380 }, "201142": { baseCost: 160, groupId: "20114", iconId: "20021", order: 20390 }, "201151": { baseCost: 160, groupId: "20115", iconId: "30012", order: 20400 }, "201152": { baseCost: 160, groupId: "20115", iconId: "30011", order: 20410 }, "201161": { baseCost: 160, groupId: "20116", iconId: "30052", order: 20420 }, "201162": { baseCost: 160, groupId: "20116", iconId: "30051", order: 20430 }, "201171": { baseCost: 110, groupId: "20117", iconId: "20011", order: 20440 }, "201172": { baseCost: 100, groupId: "20117", iconId: "20011", order: 20450 }, "201181": { baseCost: 110, groupId: "20118", iconId: "20011", order: 20460 }, "201182": { baseCost: 100, groupId: "20118", iconId: "20011", order: 20470 }, "201191": { baseCost: 160, groupId: "20119", iconId: "20012", order: 20480 }, "201192": { baseCost: 160, groupId: "20119", iconId: "20011", order: 20490 }, "201202": { baseCost: 160, groupId: "20120", iconId: "20021", order: 20510 }, "201211": { baseCost: 160, groupId: "20121", iconId: "20012", order: 20520 }, "201212": { baseCost: 160, groupId: "20121", iconId: "20011", order: 20530 }, "201221": { baseCost: 160, groupId: "20122", iconId: "30052", order: 20540 }, "201222": { baseCost: 160, groupId: "20122", iconId: "30051", order: 20550 }, "201231": { baseCost: 110, groupId: "20123", iconId: "30072", order: 20560 }, "201232": { baseCost: 110, groupId: "20123", iconId: "30071", order: 20570 }, "201241": { baseCost: 140, groupId: "20124", iconId: "20011", order: 20580 }, "201242": { baseCost: 130, groupId: "20124", iconId: "20011", order: 20590 }, "201251": { baseCost: 140, groupId: "20125", iconId: "20011", order: 20600 }, "201252": { baseCost: 130, groupId: "20125", iconId: "20011", order: 20610 }, "201261": { baseCost: 110, groupId: "20126", iconId: "20052", order: 20620 }, "201262": { baseCost: 110, groupId: "20126", iconId: "20051", order: 20630 }, "201272": { baseCost: 180, groupId: "20127", iconId: "20011", order: 20650 }, "201281": { baseCost: 180, groupId: "20128", iconId: "20022", order: 20660 }, "201282": { baseCost: 180, groupId: "20128", iconId: "20021", order: 20670 }, "201291": { baseCost: 180, groupId: "20129", iconId: "20042", order: 20680 }, "201292": { baseCost: 180, groupId: "20129", iconId: "20041", order: 20690 }, "201302": { baseCost: 130, groupId: "20130", iconId: "30021", order: 20710 }, "201311": { baseCost: 140, groupId: "20131", iconId: "20011", order: 20720 }, "201312": { baseCost: 130, groupId: "20131", iconId: "20011", order: 20730 }, "201321": { baseCost: 140, groupId: "20132", iconId: "20011", order: 20740 }, "201322": { baseCost: 130, groupId: "20132", iconId: "20011", order: 20750 }, "201331": { baseCost: 120, groupId: "20133", iconId: "20042", order: 20760 }, "201332": { baseCost: 120, groupId: "20133", iconId: "20041", order: 20770 }, "201341": { baseCost: 120, groupId: "20134", iconId: "20042", order: 20780 }, "201342": { baseCost: 120, groupId: "20134", iconId: "20041", order: 20790 }, "201351": { baseCost: 180, groupId: "20135", iconId: "20022", order: 20800 }, "201352": { baseCost: 180, groupId: "20135", iconId: "20021", order: 20810 }, "201361": { baseCost: 120, groupId: "20136", iconId: "20042", order: 20820 }, "201362": { baseCost: 120, groupId: "20136", iconId: "20041", order: 20830 }, "201371": { baseCost: 110, groupId: "20137", iconId: "30072", order: 20840 }, "201372": { baseCost: 110, groupId: "20137", iconId: "30071", order: 20850 }, "201381": { baseCost: 140, groupId: "20138", iconId: "20011", order: 20860 }, "201382": { baseCost: 130, groupId: "20138", iconId: "20011", order: 20870 }, "201391": { baseCost: 140, groupId: "20139", iconId: "20011", order: 20880 }, "201392": { baseCost: 130, groupId: "20139", iconId: "20011", order: 20890 }, "201401": { baseCost: 120, groupId: "20140", iconId: "20042", order: 20900 }, "201402": { baseCost: 120, groupId: "20140", iconId: "20041", order: 20910 }, "201411": { baseCost: 120, groupId: "20141", iconId: "20012", order: 20920 }, "201412": { baseCost: 120, groupId: "20141", iconId: "20011", order: 20930 }, "201421": { baseCost: 180, groupId: "20142", iconId: "20022", order: 20940 }, "201422": { baseCost: 180, groupId: "20142", iconId: "20021", order: 20950 }, "201431": { baseCost: 120, groupId: "20143", iconId: "20092", order: 20960 }, "201432": { baseCost: 120, groupId: "20143", iconId: "20091", order: 20970 }, "201441": { baseCost: 180, groupId: "20144", iconId: "30052", order: 20980 }, "201442": { baseCost: 180, groupId: "20144", iconId: "30051", order: 20990 }, "201451": { baseCost: 140, groupId: "20145", iconId: "20011", order: 21e3 }, "201452": { baseCost: 130, groupId: "20145", iconId: "20011", order: 21010 }, "201461": { baseCost: 140, groupId: "20146", iconId: "20011", order: 21020 }, "201462": { baseCost: 130, groupId: "20146", iconId: "20011", order: 21030 }, "201471": { baseCost: 110, groupId: "20147", iconId: "20092", order: 21040 }, "201472": { baseCost: 110, groupId: "20147", iconId: "20091", order: 21050 }, "201481": { baseCost: 170, groupId: "20148", iconId: "20022", order: 21060 }, "201482": { baseCost: 170, groupId: "20148", iconId: "20021", order: 21070 }, "201491": { baseCost: 180, groupId: "20149", iconId: "20022", order: 21080 }, "201492": { baseCost: 180, groupId: "20149", iconId: "20021", order: 21090 }, "201501": { baseCost: 110, groupId: "20150", iconId: "20092", order: 21100 }, "201502": { baseCost: 110, groupId: "20150", iconId: "20091", order: 21110 }, "201511": { baseCost: 180, groupId: "20151", iconId: "30012", order: 21120 }, "201512": { baseCost: 180, groupId: "20151", iconId: "30011", order: 21130 }, "201521": { baseCost: 130, groupId: "20152", iconId: "10051", order: 21140 }, "201522": { baseCost: 110, groupId: "20152", iconId: "10051", order: 21150 }, "201531": { baseCost: 130, groupId: "20153", iconId: "10051", order: 21160 }, "201532": { baseCost: 110, groupId: "20153", iconId: "10051", order: 21170 }, "201541": { baseCost: 130, groupId: "20154", iconId: "10051", order: 21180 }, "201542": { baseCost: 110, groupId: "20154", iconId: "10051", order: 21190 }, "201551": { baseCost: 130, groupId: "20155", iconId: "10051", order: 21200 }, "201552": { baseCost: 110, groupId: "20155", iconId: "10051", order: 21210 }, "201561": { baseCost: 110, groupId: "20156", iconId: "10062", order: 21220 }, "201562": { baseCost: 110, groupId: "20156", iconId: "10061", order: 21230 }, "201571": { baseCost: 160, groupId: "20157", iconId: "20021", order: 21240 }, "201581": { baseCost: 160, groupId: "20158", iconId: "20041", order: 21250 }, "201591": { baseCost: 160, groupId: "20159", iconId: "20011", order: 21270 }, "201592": { baseCost: 160, groupId: "20159", iconId: "20012", order: 21260 }, "201601": { baseCost: 100, groupId: "20160", iconId: "20041", order: 21280 }, "201611": { baseCost: 100, groupId: "20161", iconId: "20011", order: 21300 }, "201621": { baseCost: 100, groupId: "20162", iconId: "20021", order: 21310 }, "201631": { baseCost: 70, groupId: "20163", iconId: "10011", order: 21320 }, "201641": { baseCost: 70, groupId: "20164", iconId: "10011", order: 21330 }, "201651": { baseCost: 160, groupId: "20165", iconId: "20011", order: 21340 }, "201661": { baseCost: 160, groupId: "20166", iconId: "20011", order: 21350 }, "201671": { baseCost: 180, groupId: "20167", iconId: "20012", order: 21360 }, "201672": { baseCost: 180, groupId: "20167", iconId: "20011", order: 21370 }, "201681": { baseCost: 140, groupId: "20168", iconId: "20052", order: 21380 }, "201682": { baseCost: 140, groupId: "20168", iconId: "20051", order: 21390 }, "201691": { baseCost: 180, groupId: "20169", iconId: "20022", order: 21400 }, "201692": { baseCost: 180, groupId: "20169", iconId: "20021", order: 21410 }, "201701": { baseCost: 160, groupId: "20170", iconId: "20012", order: 21420 }, "201702": { baseCost: 160, groupId: "20170", iconId: "20011", order: 21430 }, "201902": { baseCost: 180, groupId: "20190", iconId: "20041", order: 21450 }, "202022": { baseCost: 180, groupId: "20202", iconId: "20011", order: 21510 }, "202032": { baseCost: 120, groupId: "20203", iconId: "20011", order: 21530 }, "202051": { baseCost: 200, groupId: "20205", iconId: "40012", order: 990 }, "210011": { baseCost: 200, groupId: "21001", iconId: "20102", order: 31e3 }, "210012": { baseCost: 200, groupId: "21001", iconId: "20101", order: 31001 }, "210021": { baseCost: 200, groupId: "21002", iconId: "20112", order: 31002 }, "210022": { baseCost: 200, groupId: "21002", iconId: "20111", order: 31003 }, "210031": { baseCost: 200, groupId: "21003", iconId: "20122", order: 31004 }, "210032": { baseCost: 200, groupId: "21003", iconId: "20121", order: 31005 }, "210041": { baseCost: 200, groupId: "21004", iconId: "20102", order: 31006 }, "210042": { baseCost: 200, groupId: "21004", iconId: "20101", order: 31007 }, "210051": { baseCost: 200, groupId: "21005", iconId: "20132", order: 31008 }, "210052": { baseCost: 200, groupId: "21005", iconId: "20131", order: 31009 }, "900011": { baseCost: 200, groupId: "90001", iconId: "20011", order: 30 }, "900021": { baseCost: 200, groupId: "90002", iconId: "20011", order: 30 }, "900031": { baseCost: 200, groupId: "90003", iconId: "20011", order: 30 }, "900041": { baseCost: 200, groupId: "90004", iconId: "20041", order: 30 }, "900051": { baseCost: 200, groupId: "90005", iconId: "20011", order: 30 }, "900061": { baseCost: 200, groupId: "90006", iconId: "20011", order: 30 }, "900071": { baseCost: 200, groupId: "90007", iconId: "20011", order: 30 }, "900081": { baseCost: 200, groupId: "90008", iconId: "20011", order: 30 }, "900091": { baseCost: 200, groupId: "90009", iconId: "20011", order: 30 }, "900101": { baseCost: 200, groupId: "90010", iconId: "20041", order: 30 }, "900111": { baseCost: 200, groupId: "90011", iconId: "20011", order: 30 }, "900121": { baseCost: 200, groupId: "90012", iconId: "20011", order: 30 }, "900131": { baseCost: 200, groupId: "90013", iconId: "20011", order: 30 }, "900141": { baseCost: 200, groupId: "90014", iconId: "20011", order: 30 }, "900151": { baseCost: 200, groupId: "90015", iconId: "20011", order: 30 }, "900161": { baseCost: 200, groupId: "90016", iconId: "20011", order: 30 }, "900171": { baseCost: 200, groupId: "90017", iconId: "20011", order: 30 }, "900181": { baseCost: 200, groupId: "90018", iconId: "20011", order: 30 }, "900191": { baseCost: 200, groupId: "90019", iconId: "20011", order: 30 }, "900201": { baseCost: 200, groupId: "90020", iconId: "20041", order: 30 }, "900231": { baseCost: 200, groupId: "90023", iconId: "20011", order: 30 }, "900241": { baseCost: 200, groupId: "90024", iconId: "20011", order: 30 }, "900261": { baseCost: 200, groupId: "90026", iconId: "20011", order: 30 }, "900271": { baseCost: 200, groupId: "90027", iconId: "20041", order: 30 }, "900281": { baseCost: 200, groupId: "90028", iconId: "20011", order: 30 }, "900301": { baseCost: 200, groupId: "90030", iconId: "20011", order: 30 }, "900321": { baseCost: 200, groupId: "90032", iconId: "20021", order: 30 }, "900351": { baseCost: 200, groupId: "90035", iconId: "20011", order: 30 }, "900371": { baseCost: 200, groupId: "90037", iconId: "20011", order: 30 }, "900381": { baseCost: 200, groupId: "90038", iconId: "20011", order: 30 }, "900391": { baseCost: 200, groupId: "90039", iconId: "20011", order: 30 }, "900401": { baseCost: 200, groupId: "90040", iconId: "20041", order: 30 }, "900411": { baseCost: 200, groupId: "90041", iconId: "20011", order: 30 }, "900451": { baseCost: 200, groupId: "90045", iconId: "20021", order: 30 }, "900461": { baseCost: 200, groupId: "90046", iconId: "20011", order: 30 }, "900501": { baseCost: 200, groupId: "90050", iconId: "20011", order: 30 }, "900521": { baseCost: 200, groupId: "90052", iconId: "20021", order: 30 }, "900561": { baseCost: 200, groupId: "90056", iconId: "20011", order: 30 }, "900581": { baseCost: 200, groupId: "90058", iconId: "20011", order: 30 }, "900601": { baseCost: 200, groupId: "90060", iconId: "20011", order: 30 }, "900611": { baseCost: 200, groupId: "90061", iconId: "20011", order: 30 }, "910011": { baseCost: 200, groupId: "91001", iconId: "20021", order: 30 }, "910031": { baseCost: 200, groupId: "91003", iconId: "20011", order: 30 }, "910041": { baseCost: 200, groupId: "91004", iconId: "20011", order: 30 }, "910111": { baseCost: 200, groupId: "91011", iconId: "20021", order: 30 }, "910131": { baseCost: 200, groupId: "91013", iconId: "20011", order: 30 }, "910141": { baseCost: 200, groupId: "91014", iconId: "20041", order: 30 }, "910181": { baseCost: 200, groupId: "91018", iconId: "20011", order: 30 }, "910241": { baseCost: 200, groupId: "91024", iconId: "20011", order: 30 }, "910301": { baseCost: 200, groupId: "91030", iconId: "20021", order: 30 }, "910451": { baseCost: 200, groupId: "91045", iconId: "20011", order: 30 }, "910561": { baseCost: 200, groupId: "91056", iconId: "20011", order: 30 } };

// ../uma-tools/components/HorseDefTypes.ts
function SkillSet(ids) {
  return (0, import_immutable.Map)(ids.map((id) => [skill_meta_default[id].groupId, id]));
}
var HorseState = class extends (0, import_immutable.Record)({
  outfitId: "",
  speed: false ? 1200 : 1850,
  stamina: false ? 1200 : 1700,
  power: false ? 800 : 1700,
  guts: false ? 400 : 1200,
  wisdom: false ? 400 : 1300,
  strategy: "Senkou",
  distanceAptitude: "S",
  surfaceAptitude: "A",
  strategyAptitude: "A",
  skills: SkillSet([])
}) {
};

// ../uma-tools/uma-skill-tools/HorseTypes.ts
var import_node_assert = require("node:assert");
var Strategy = /* @__PURE__ */ ((Strategy2) => {
  Strategy2[Strategy2["Nige"] = 1] = "Nige";
  Strategy2[Strategy2["Senkou"] = 2] = "Senkou";
  Strategy2[Strategy2["Sasi"] = 3] = "Sasi";
  Strategy2[Strategy2["Oikomi"] = 4] = "Oikomi";
  Strategy2[Strategy2["Oonige"] = 5] = "Oonige";
  return Strategy2;
})(Strategy || {});
var StrategyHelpers;
((StrategyHelpers2) => {
  function assertIsStrategy(strategy) {
    (0, import_node_assert.strict)(Strategy.hasOwnProperty(strategy));
  }
  StrategyHelpers2.assertIsStrategy = assertIsStrategy;
  function strategyMatches(s1, s2) {
    return s1 == s2 || s1 == 1 /* Nige */ && s2 == 5 /* Oonige */ || s1 == 5 /* Oonige */ && s2 == 1 /* Nige */;
  }
  StrategyHelpers2.strategyMatches = strategyMatches;
})(StrategyHelpers || (StrategyHelpers = {}));

// ../uma-tools/uma-skill-tools/CourseData.ts
var import_node_assert2 = require("node:assert");

// ../uma-tools/umalator-global/course_data.json
var course_data_default = { "10101": { corners: [{ length: 275, start: 400 }, { length: 275, start: 675 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 950 }], surface: 1, turn: 1 }, "10102": { corners: [{ length: 275, start: 150 }, { length: 275, start: 700 }, { length: 275, start: 975 }], course: 1, courseSetStatus: [], distance: 1500, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 879e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 700, frontType: 2, start: 425 }, { end: 1500, frontType: 1, start: 1250 }], surface: 1, turn: 1 }, "10103": { corners: [{ length: 275, start: 175 }, { length: 275, start: 450 }, { length: 275, start: 1e3 }, { length: 275, start: 1275 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 175, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 725 }, { end: 1800, frontType: 1, start: 1550 }], surface: 1, turn: 1 }, "10104": { corners: [{ length: 275, start: 375 }, { length: 275, start: 650 }, { length: 275, start: 1200 }, { length: 275, start: 1475 }], course: 1, courseSetStatus: [3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 375, frontType: 1, start: 0 }, { end: 1200, frontType: 2, start: 925 }, { end: 2e3, frontType: 1, start: 1750 }], surface: 1, turn: 1 }, "10105": { corners: [{ length: 275, start: 175 }, { length: 275, start: 450 }, { length: 275, start: 975 }, { length: 275, start: 1250 }, { length: 275, start: 1800 }, { length: 275, start: 2075 }], course: 1, courseSetStatus: [2], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 13500, raceTrackId: 10001, slopes: [], straights: [{ end: 175, frontType: 2, start: 0 }, { end: 975, frontType: 1, start: 725 }, { end: 1800, frontType: 2, start: 1525 }, { end: 2600, frontType: 1, start: 2350 }], surface: 1, turn: 1 }, "10106": { corners: [{ length: 230, start: 280 }, { length: 230, start: 510 }], course: 1, courseSetStatus: [], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 574e3, laneMax: 11e3, raceTrackId: 10001, slopes: [], straights: [{ end: 280, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 740 }], surface: 2, turn: 1 }, "10107": { corners: [{ length: 230, start: 240 }, { length: 230, start: 470 }, { length: 230, start: 980 }, { length: 230, start: 1210 }], course: 1, courseSetStatus: [1], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 11e3, raceTrackId: 10001, slopes: [], straights: [{ end: 240, frontType: 1, start: 0 }, { end: 980, frontType: 2, start: 700 }, { end: 1700, frontType: 1, start: 1440 }], surface: 2, turn: 1 }, "10108": { corners: [{ length: 230, start: 200 }, { length: 230, start: 430 }, { length: 230, start: 940 }, { length: 230, start: 1170 }, { length: 230, start: 1680 }, { length: 230, start: 1910 }], course: 1, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 11e3, raceTrackId: 10001, slopes: [], straights: [{ end: 200, frontType: 2, start: 0 }, { end: 940, frontType: 1, start: 660 }, { end: 1680, frontType: 2, start: 1408 }, { end: 2400, frontType: 1, start: 2140 }], surface: 2, turn: 1 }, "10201": { corners: [{ length: 220, start: 310 }, { length: 220, start: 530 }], course: 1, courseSetStatus: [], distance: 1e3, distanceType: 1, finishTimeMax: 57e4, finishTimeMin: 547e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 555, slope: 1e4, start: 0 }], straights: [{ end: 310, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 750 }], surface: 1, turn: 1 }, "10202": { corners: [{ length: 220, start: 510 }, { length: 220, start: 730 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 755, slope: 1e4, start: 0 }], straights: [{ end: 510, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 950 }], surface: 1, turn: 1 }, "10203": { corners: [{ length: 220, start: 320 }, { length: 220, start: 540 }, { length: 220, start: 1110 }, { length: 220, start: 1330 }], course: 1, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 200, slope: -1e4, start: 220 }, { length: 720, slope: 1e4, start: 665 }], straights: [{ end: 320, frontType: 1, start: 0 }, { end: 1110, frontType: 2, start: 760 }, { end: 1800, frontType: 1, start: 1550 }], surface: 1, turn: 1 }, "10204": { corners: [{ length: 220, start: 520 }, { length: 220, start: 740 }, { length: 220, start: 1310 }, { length: 220, start: 1530 }], course: 1, courseSetStatus: [1], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 200, slope: -1e4, start: 420 }, { length: 720, slope: 1e4, start: 865 }], straights: [{ end: 520, frontType: 1, start: 0 }, { end: 1310, frontType: 2, start: 960 }, { end: 2e3, frontType: 1, start: 1750 }], surface: 1, turn: 1 }, "10205": { corners: [{ length: 230, start: 240 }, { length: 230, start: 470 }, { length: 230, start: 1070 }, { length: 230, start: 1300 }, { length: 230, start: 1890 }, { length: 230, start: 2120 }], course: 1, courseSetStatus: [2], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 14700, raceTrackId: 10002, slopes: [{ length: 495, slope: 1e4, start: 0 }, { length: 200, slope: -1e4, start: 970 }, { length: 720, slope: 1e4, start: 1425 }], straights: [{ end: 240, frontType: 2, start: 0 }, { end: 1070, frontType: 1, start: 700 }, { end: 1890, frontType: 2, start: 1530 }, { end: 2600, frontType: 1, start: 2350 }], surface: 1, turn: 1 }, "10206": { corners: [{ length: 190, start: 370 }, { length: 190, start: 560 }], course: 1, courseSetStatus: [], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 574e3, laneMax: 11e3, raceTrackId: 10002, slopes: [], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 750 }], surface: 2, turn: 1 }, "10207": { corners: [{ length: 190, start: 350 }, { length: 190, start: 540 }, { length: 190, start: 1070 }, { length: 190, start: 1260 }], course: 1, courseSetStatus: [], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 11e3, raceTrackId: 10002, slopes: [{ length: 340, slope: -1e4, start: 275 }, { length: 670, slope: 1e4, start: 615 }], straights: [{ end: 350, frontType: 1, start: 0 }, { end: 1070, frontType: 2, start: 730 }, { end: 1700, frontType: 1, start: 1450 }], surface: 2, turn: 1 }, "10208": { corners: [{ length: 190, start: 292 }, { length: 190, start: 482 }, { length: 190, start: 1040 }, { length: 190, start: 1230 }, { length: 190, start: 1770 }, { length: 190, start: 1960 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 11e3, raceTrackId: 10002, slopes: [], straights: [{ end: 292, frontType: 2, start: 0 }, { end: 1040, frontType: 1, start: 672 }, { end: 1770, frontType: 2, start: 1420 }, { end: 2400, frontType: 1, start: 2150 }], surface: 2, turn: 1 }, "10301": { corners: [], course: 1, courseSetStatus: [3], distance: 1e3, distanceType: 1, finishTimeMax: 57e4, finishTimeMin: 547e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 649.9, frontType: 1, start: 0 }, { end: 1e3, frontType: 1, start: 650 }], surface: 1, turn: 4 }, "10302": { corners: [{ length: 200, start: 430 }, { length: 210, start: 640 }], course: 2, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 430, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 850 }], surface: 1, turn: 2 }, "10303": { corners: [{ length: 200, start: 650 }, { length: 200, start: 850 }], course: 2, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 650, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1050 }], surface: 1, turn: 2 }, "10304": { corners: [{ length: 200, start: 550 }, { length: 200, start: 750 }], course: 3, courseSetStatus: [], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 13500, raceTrackId: 10003, slopes: [{ length: 350, slope: 1e4, start: 250 }, { length: 300, slope: -15e3, start: 600 }], straights: [{ end: 550, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 950 }], surface: 1, turn: 2 }, "10305": { corners: [{ length: 200, start: 750 }, { length: 200, start: 950 }], course: 3, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 13500, raceTrackId: 10003, slopes: [{ length: 350, slope: 1e4, start: 450 }, { length: 300, slope: -15e3, start: 800 }], straights: [{ end: 750, frontType: 2, start: 0 }, { end: 1800, frontType: 1, start: 1150 }], surface: 1, turn: 2 }, "10306": { corners: [{ length: 200, start: 420 }, { length: 200, start: 620 }, { length: 200, start: 1250 }, { length: 200, start: 1450 }], course: 2, courseSetStatus: [2, 3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 420, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 820 }, { end: 2e3, frontType: 1, start: 1650 }], surface: 1, turn: 2 }, "10307": { corners: [{ length: 200, start: 950 }, { length: 200, start: 1150 }], course: 3, courseSetStatus: [2, 3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13500, raceTrackId: 10003, slopes: [{ length: 350, slope: 1e4, start: 650 }, { length: 300, slope: -15e3, start: 1e3 }], straights: [{ end: 950, frontType: 2, start: 0 }, { end: 2e3, frontType: 1, start: 1350 }], surface: 1, turn: 2 }, "10308": { corners: [{ length: 200, start: 650 }, { length: 200, start: 850 }, { length: 200, start: 1450 }, { length: 200, start: 1650 }], course: 2, courseSetStatus: [1], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 650, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 1050 }, { end: 2200, frontType: 1, start: 1850 }], surface: 1, turn: 2 }, "10309": { corners: [{ length: 200, start: 810 }, { length: 200, start: 1010 }, { length: 200, start: 1650 }, { length: 200, start: 1850 }], course: 2, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 13500, raceTrackId: 10003, slopes: [], straights: [{ end: 810, frontType: 1, start: 0 }, { end: 1650, frontType: 2, start: 1210 }, { end: 2400, frontType: 1, start: 2050 }], surface: 1, turn: 2 }, "10310": { corners: [{ length: 150, start: 600 }, { length: 150, start: 750 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 11e3, raceTrackId: 10003, slopes: [], straights: [{ end: 600, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 900 }], surface: 2, turn: 2 }, "10311": { corners: [{ length: 160, start: 400 }, { length: 160, start: 560 }, { length: 160, start: 1140 }, { length: 160, start: 1300 }], course: 1, courseSetStatus: [5], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 11e3, raceTrackId: 10003, slopes: [], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1140, frontType: 2, start: 720 }, { end: 1800, frontType: 1, start: 1460 }], surface: 2, turn: 2 }, "10312": { corners: [{ length: 160, start: 380 }, { length: 160, start: 540 }, { length: 160, start: 1120 }, { length: 160, start: 1280 }, { length: 160, start: 1850 }, { length: 160, start: 2010 }], course: 1, courseSetStatus: [], distance: 2500, distanceType: 4, finishTimeMax: 164e4, finishTimeMin: 1591e3, laneMax: 11e3, raceTrackId: 10003, slopes: [], straights: [{ end: 380, frontType: 2, start: 0 }, { end: 1120, frontType: 1, start: 700 }, { end: 1850, frontType: 2, start: 1440 }, { end: 2500, frontType: 1, start: 2170 }], surface: 2, turn: 2 }, "10401": { corners: [{ length: 300, start: 420 }, { length: 200, start: 720 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 100, slope: 15e3, start: 180 }], straights: [{ end: 420, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 920 }], surface: 1, turn: 1 }, "10402": { corners: [{ length: 200, start: 330 }, { length: 200, start: 530 }, { length: 300, start: 1020 }, { length: 200, start: 1320 }], course: 1, courseSetStatus: [2], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 100, slope: 15e3, start: 780 }], straights: [{ end: 330, frontType: 1, start: 0 }, { end: 1020, frontType: 2, start: 730 }, { end: 1800, frontType: 1, start: 1520 }], surface: 1, turn: 1 }, "10403": { corners: [{ length: 200, start: 530 }, { length: 200, start: 730 }, { length: 300, start: 1220 }, { length: 200, start: 1520 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 100, slope: 15e3, start: 980 }], straights: [{ end: 530, frontType: 1, start: 0 }, { end: 1220, frontType: 2, start: 930 }, { end: 2e3, frontType: 1, start: 1720 }], surface: 1, turn: 1 }, "10404": { corners: [{ length: 300, start: 220 }, { length: 200, start: 520 }, { length: 200, start: 1130 }, { length: 200, start: 1330 }, { length: 300, start: 1820 }, { length: 200, start: 2120 }], course: 1, courseSetStatus: [], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 13e3, raceTrackId: 10004, slopes: [{ length: 80, slope: 15e3, start: 0 }, { length: 100, slope: 15e3, start: 1580 }], straights: [{ end: 220, frontType: 2, start: 0 }, { end: 1130, frontType: 1, start: 720 }, { end: 1820, frontType: 2, start: 1530 }, { end: 2600, frontType: 1, start: 2320 }], surface: 1, turn: 1 }, "10405": { corners: [{ length: 210, start: 500 }, { length: 160, start: 710 }], course: 1, courseSetStatus: [], distance: 1150, distanceType: 1, finishTimeMax: 72e4, finishTimeMin: 666e3, laneMax: 11500, raceTrackId: 10004, slopes: [], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1150, frontType: 1, start: 870 }], surface: 2, turn: 1 }, "10406": { corners: [{ length: 170, start: 360 }, { length: 170, start: 530 }, { length: 210, start: 1050 }, { length: 160, start: 1260 }], course: 1, courseSetStatus: [3], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 11500, raceTrackId: 10004, slopes: [{ length: 320, slope: -1e4, start: 285 }], straights: [{ end: 360, frontType: 1, start: 0 }, { end: 1050, frontType: 2, start: 700 }, { end: 1700, frontType: 1, start: 1420 }], surface: 2, turn: 1 }, "10407": { corners: [{ length: 210, start: 310 }, { length: 160, start: 520 }, { length: 170, start: 1060 }, { length: 170, start: 1230 }, { length: 210, start: 1750 }, { length: 160, start: 1960 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 11500, raceTrackId: 10004, slopes: [], straights: [{ end: 310, frontType: 2, start: 0 }, { end: 1060, frontType: 1, start: 680 }, { end: 1750, frontType: 2, start: 1400 }, { end: 2400, frontType: 1, start: 2120 }], surface: 2, turn: 1 }, "10501": { corners: [{ length: 350, start: 300 }, { length: 250, start: 650 }], course: 3, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 200, slope: -15e3, start: 0 }, { length: 110, slope: 2e4, start: 1025 }], straights: [{ end: 1200, frontType: 1, start: 900 }], surface: 1, turn: 1 }, "10502": { corners: [{ length: 450, start: 50 }, { length: 350, start: 700 }, { length: 250, start: 1050 }], course: 3, courseSetStatus: [3], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 300, slope: -15e3, start: 300 }, { length: 110, slope: 2e4, start: 1425 }], straights: [{ end: 1600, frontType: 1, start: 1300 }], surface: 1, turn: 1 }, "10503": { corners: [{ length: 250, start: 175 }, { length: 250, start: 425 }, { length: 250, start: 1e3 }, { length: 250, start: 1250 }], course: 2, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 35, slope: 2e4, start: 1 }, { length: 200, slope: 15e3, start: 125 }, { length: 400, slope: -15e3, start: 425 }, { length: 110, slope: 2e4, start: 1625 }], straights: [{ end: 175, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 675 }, { end: 1800, frontType: 1, start: 1500 }], surface: 1, turn: 1 }, "10504": { corners: [{ length: 250, start: 375 }, { length: 250, start: 625 }, { length: 250, start: 1200 }, { length: 250, start: 1450 }], course: 2, courseSetStatus: [1], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 125 }, { length: 200, slope: 15e3, start: 325 }, { length: 400, slope: -15e3, start: 625 }, { length: 110, slope: 2e4, start: 1825 }], straights: [{ end: 375, frontType: 1, start: 0 }, { end: 1200, frontType: 2, start: 875 }, { end: 2e3, frontType: 1, start: 1700 }], surface: 1, turn: 1 }, "10505": { corners: [{ length: 247, start: 403 }, { length: 450, start: 650 }, { length: 350, start: 1300 }, { length: 250, start: 1650 }], course: 3, courseSetStatus: [2, 4], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 153 }, { length: 200, slope: 15e3, start: 353 }, { length: 300, slope: -15e3, start: 900 }, { length: 110, slope: 2e4, start: 2025 }], straights: [{ end: 403, frontType: 1, start: 0 }, { end: 2200, frontType: 1, start: 1900 }], surface: 1, turn: 1 }, "10506": { corners: [{ length: 146, start: 100 }, { length: 250, start: 246 }, { length: 250, start: 875 }, { length: 250, start: 1125 }, { length: 250, start: 1700 }, { length: 250, start: 1950 }], course: 2, courseSetStatus: [2, 4], distance: 2500, distanceType: 4, finishTimeMax: 157e4, finishTimeMin: 1487e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 621 }, { length: 200, slope: 15e3, start: 825 }, { length: 400, slope: -15e3, start: 1125 }, { length: 110, slope: 2e4, start: 2325 }], straights: [{ end: 875, frontType: 1, start: 496 }, { end: 1700, frontType: 2, start: 1375 }, { end: 2500, frontType: 1, start: 2200 }], surface: 1, turn: 1 }, "10507": { corners: [{ length: 250, start: 290 }, { length: 250, start: 540 }, { length: 250, start: 1115 }, { length: 250, start: 1365 }, { length: 250, start: 1975 }, { length: 250, start: 2225 }, { length: 250, start: 2800 }, { length: 250, start: 3050 }], course: 2, courseSetStatus: [2], distance: 3600, distanceType: 4, finishTimeMax: 227e4, finishTimeMin: 2231e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 110, slope: 2e4, start: 40 }, { length: 200, slope: 15e3, start: 240 }, { length: 400, slope: -15e3, start: 540 }, { length: 110, slope: 2e4, start: 1740 }, { length: 200, slope: 15e3, start: 1925 }, { length: 400, slope: -15e3, start: 2225 }, { length: 110, slope: 2e4, start: 3425 }], straights: [{ end: 290, frontType: 1, start: 0 }, { end: 1115, frontType: 2, start: 790 }, { end: 1975, frontType: 1, start: 1615 }, { end: 2800, frontType: 2, start: 2475 }, { end: 3600, frontType: 1, start: 3300 }], surface: 1, turn: 1 }, "10508": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }], course: 1, courseSetStatus: [3], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 175, slope: -15e3, start: 175 }, { length: 175, slope: 15e3, start: 1e3 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 900 }], surface: 2, turn: 1 }, "10509": { corners: [{ length: 200, start: 350 }, { length: 200, start: 550 }, { length: 200, start: 1100 }, { length: 200, start: 1300 }], course: 1, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 12e3, raceTrackId: 10005, slopes: [{ length: 175, slope: 15e3, start: 100 }, { length: 175, slope: 1e4, start: 350 }, { length: 175, slope: -15e3, start: 775 }, { length: 175, slope: 15e3, start: 1600 }], straights: [{ end: 350, frontType: 1, start: 0 }, { end: 1100, frontType: 1, start: 750 }, { end: 1800, frontType: 1, start: 1500 }], surface: 2, turn: 1 }, "10510": { corners: [{ length: 200, start: 200 }, { length: 200, start: 400 }, { length: 200, start: 950 }, { length: 200, start: 1150 }, { length: 200, start: 1700 }, { length: 200, start: 1900 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 12e3, raceTrackId: 10005, slopes: [], straights: [{ end: 200, frontType: 2, start: 0 }, { end: 950, frontType: 1, start: 600 }, { end: 1700, frontType: 2, start: 1350 }, { end: 2400, frontType: 1, start: 2100 }], surface: 2, turn: 1 }, "10511": { corners: [{ length: 200, start: 300 }, { length: 200, start: 500 }, { length: 200, start: 1050 }, { length: 200, start: 1250 }, { length: 200, start: 1800 }, { length: 200, start: 2e3 }], course: 1, courseSetStatus: [], distance: 2500, distanceType: 4, finishTimeMax: 164e4, finishTimeMin: 1591e3, laneMax: 12e3, raceTrackId: 10005, slopes: [], straights: [{ end: 300, frontType: 2, start: 0 }, { end: 1050, frontType: 1, start: 700 }, { end: 1800, frontType: 2, start: 1450 }, { end: 2500, frontType: 1, start: 2200 }], surface: 2, turn: 1 }, "10601": { corners: [{ length: 275, start: 350 }, { length: 275, start: 625 }], course: 1, courseSetStatus: [2, 3], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 125 }, { length: 250, slope: -15e3, start: 250 }, { length: 150, slope: 15e3, start: 950 }], straights: [{ end: 350, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 900 }], surface: 1, turn: 2 }, "10602": { corners: [{ length: 275, start: 550 }, { length: 275, start: 825 }], course: 1, courseSetStatus: [2, 4], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 325 }, { length: 250, slope: -15e3, start: 450 }, { length: 150, slope: 15e3, start: 1150 }], straights: [{ end: 550, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 1100 }], surface: 1, turn: 2 }, "10603": { corners: [{ length: 250, start: 75 }, { length: 275, start: 750 }, { length: 275, start: 1025 }], course: 1, courseSetStatus: [1], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 525 }, { length: 250, slope: -15e3, start: 650 }, { length: 150, slope: 15e3, start: 1350 }], straights: [{ end: 750, frontType: 2, start: 325 }, { end: 1800, frontType: 1, start: 1300 }], surface: 1, turn: 2 }, "10604": { corners: [{ length: 200, start: 200 }, { length: 275, start: 950 }, { length: 275, start: 1225 }], course: 1, courseSetStatus: [], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 725 }, { length: 250, slope: -15e3, start: 850 }, { length: 150, slope: 15e3, start: 1550 }], straights: [{ end: 950, frontType: 2, start: 400 }, { end: 2e3, frontType: 1, start: 1500 }], surface: 1, turn: 2 }, "10605": { corners: [{ length: 250, start: 225 }, { length: 325, start: 475 }, { length: 275, start: 1250 }, { length: 275, start: 1525 }], course: 1, courseSetStatus: [3], distance: 2300, distanceType: 3, finishTimeMax: 143e4, finishTimeMin: 1393e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 1025 }, { length: 250, slope: -15e3, start: 1150 }, { length: 150, slope: 15e3, start: 1850 }], straights: [{ end: 225, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 800 }, { end: 2300, frontType: 1, start: 1800 }], surface: 1, turn: 2 }, "10606": { corners: [{ length: 250, start: 325 }, { length: 325, start: 575 }, { length: 275, start: 1350 }, { length: 275, start: 1625 }], course: 1, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 40, slope: 15e3, start: 0 }, { length: 75, slope: 2e4, start: 1125 }, { length: 250, slope: -15e3, start: 1250 }, { length: 150, slope: 15e3, start: 1950 }], straights: [{ end: 325, frontType: 1, start: 0 }, { end: 1350, frontType: 2, start: 900 }, { end: 2400, frontType: 1, start: 1900 }], surface: 1, turn: 2 }, "10607": { corners: [{ length: 250, start: 425 }, { length: 325, start: 675 }, { length: 275, start: 1450 }, { length: 275, start: 1725 }], course: 1, courseSetStatus: [2], distance: 2500, distanceType: 4, finishTimeMax: 157e4, finishTimeMin: 1487e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 140, slope: 15e3, start: 0 }, { length: 75, slope: 2e4, start: 1225 }, { length: 250, slope: -15e3, start: 1350 }, { length: 150, slope: 15e3, start: 2050 }], straights: [{ end: 425, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 1e3 }, { end: 2500, frontType: 1, start: 2e3 }], surface: 1, turn: 2 }, "10608": { corners: [{ length: 275, start: 292 }, { length: 275, start: 567 }, { length: 250, start: 1325 }, { length: 325, start: 1575 }, { length: 275, start: 2350 }, { length: 275, start: 2625 }], course: 1, courseSetStatus: [], distance: 3400, distanceType: 4, finishTimeMax: 214e4, finishTimeMin: 2099e3, laneMax: 15e3, raceTrackId: 10006, slopes: [{ length: 75, slope: 2e4, start: 67 }, { length: 250, slope: -15e3, start: 192 }, { length: 150, slope: 15e3, start: 892 }, { length: 75, slope: 2e4, start: 2125 }, { length: 250, slope: -15e3, start: 2250 }, { length: 150, slope: 15e3, start: 2950 }], straights: [{ end: 292, frontType: 2, start: 0 }, { end: 1325, frontType: 1, start: 842 }, { end: 2350, frontType: 2, start: 1900 }, { end: 3400, frontType: 1, start: 2900 }], surface: 1, turn: 2 }, "10609": { corners: [{ length: 225, start: 350 }, { length: 225, start: 575 }], course: 1, courseSetStatus: [1], distance: 1300, distanceType: 1, finishTimeMax: 82e4, finishTimeMin: 766e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 275 }, { length: 250, slope: 15e3, start: 800 }], straights: [{ end: 350, frontType: 2, start: 0 }, { end: 1300, frontType: 1, start: 800 }], surface: 2, turn: 2 }, "10610": { corners: [{ length: 225, start: 450 }, { length: 225, start: 675 }], course: 1, courseSetStatus: [2], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 375 }, { length: 250, slope: 15e3, start: 900 }], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 900 }], surface: 2, turn: 2 }, "10611": { corners: [{ length: 225, start: 650 }, { length: 225, start: 875 }], course: 1, courseSetStatus: [1, 2], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 941e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 575 }, { length: 250, slope: 15e3, start: 1100 }], straights: [{ end: 650, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 1100 }], surface: 2, turn: 2 }, "10612": { corners: [{ length: 250, start: 200 }, { length: 250, start: 450 }, { length: 225, start: 1150 }, { length: 225, start: 1375 }], course: 1, courseSetStatus: [], distance: 2100, distanceType: 3, finishTimeMax: 133e4, finishTimeMin: 1274e3, laneMax: 12500, raceTrackId: 10006, slopes: [{ length: 200, slope: -1e4, start: 1075 }, { length: 250, slope: 15e3, start: 1600 }], straights: [{ end: 200, frontType: 1, start: 0 }, { end: 1150, frontType: 2, start: 700 }, { end: 2100, frontType: 1, start: 1600 }], surface: 2, turn: 2 }, "10613": { corners: [{ length: 250, start: 500 }, { length: 250, start: 750 }, { length: 225, start: 1450 }, { length: 225, start: 1675 }, { length: 500, start: 2348 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 12500, raceTrackId: 10006, slopes: [], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 1e3 }, { end: 2400, frontType: 1, start: 1900 }], surface: 2, turn: 2 }, "10701": { corners: [{ length: 250, start: 300 }, { length: 250, start: 550 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 775, slope: -1e4, start: 100 }, { length: 100, slope: 2e4, start: 875 }], straights: [{ end: 300, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 800 }], surface: 1, turn: 2 }, "10702": { corners: [{ length: 250, start: 500 }, { length: 250, start: 750 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 775, slope: -1e4, start: 300 }, { length: 100, slope: 2e4, start: 1075 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1e3 }], surface: 1, turn: 2 }, "10703": { corners: [{ length: 150, start: 150 }, { length: 250, start: 700 }, { length: 250, start: 950 }], course: 1, courseSetStatus: [1], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 775, slope: -1e4, start: 500 }, { length: 100, slope: 2e4, start: 1275 }], straights: [{ end: 700, frontType: 2, start: 300 }, { end: 1600, frontType: 1, start: 1200 }], surface: 1, turn: 2 }, "10704": { corners: [{ length: 200, start: 300 }, { length: 200, start: 500 }, { length: 250, start: 1100 }, { length: 250, start: 1350 }], course: 1, courseSetStatus: [], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 50, slope: 2e4, start: 0 }, { length: 775, slope: -1e4, start: 900 }, { length: 100, slope: 2e4, start: 1675 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 2e3, frontType: 1, start: 1600 }], surface: 1, turn: 2 }, "10705": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }, { length: 250, start: 1300 }, { length: 250, start: 1550 }], course: 1, courseSetStatus: [2], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 14400, raceTrackId: 10007, slopes: [{ length: 150, slope: -1e4, start: 0 }, { length: 100, slope: 2e4, start: 150 }, { length: 775, slope: -1e4, start: 1100 }, { length: 100, slope: 2e4, start: 1875 }], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 900 }, { end: 2200, frontType: 1, start: 1800 }], surface: 1, turn: 2 }, "10706": { corners: [{ length: 200, start: 400 }, { length: 200, start: 600 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 13e3, raceTrackId: 10007, slopes: [], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 800 }], surface: 2, turn: 2 }, "10707": { corners: [{ length: 200, start: 600 }, { length: 200, start: 800 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 13e3, raceTrackId: 10007, slopes: [{ length: 600, slope: -15e3, start: 425 }, { length: 150, slope: 15e3, start: 1025 }], straights: [{ end: 600, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1e3 }], surface: 2, turn: 2 }, "10708": { corners: [{ length: 165, start: 270 }, { length: 165, start: 435 }, { length: 200, start: 1e3 }, { length: 200, start: 1200 }], course: 1, courseSetStatus: [2], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 13e3, raceTrackId: 10007, slopes: [{ length: 50, slope: 15e3, start: 0 }, { length: 600, slope: -15e3, start: 825 }, { length: 150, slope: 15e3, start: 1425 }], straights: [{ end: 270, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1400 }], surface: 2, turn: 2 }, "10709": { corners: [{ length: 165, start: 370 }, { length: 165, start: 535 }, { length: 200, start: 1100 }, { length: 200, start: 1300 }], course: 1, courseSetStatus: [], distance: 1900, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1142e3, laneMax: 13e3, raceTrackId: 10007, slopes: [], straights: [{ end: 370, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1900, frontType: 1, start: 1500 }], surface: 2, turn: 2 }, "10801": { corners: [{ length: 275, start: 320 }, { length: 275, start: 595 }], course: 2, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 120 }, { length: 150, slope: -15e3, start: 420 }], straights: [{ end: 320, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 870 }], surface: 1, turn: 1 }, "10802": { corners: [{ length: 275, start: 520 }, { length: 275, start: 795 }], course: 2, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 320 }, { length: 150, slope: -15e3, start: 620 }], straights: [{ end: 520, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1070 }], surface: 1, turn: 1 }, "10803": { corners: [{ length: 250, start: 500 }, { length: 250, start: 750 }], course: 3, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 250 }, { length: 225, slope: 1e4, start: 350 }, { length: 150, slope: -2e4, start: 575 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1e3 }], surface: 1, turn: 1 }, "10804": { corners: [{ length: 275, start: 720 }, { length: 275, start: 995 }], course: 2, courseSetStatus: [1], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 520 }, { length: 150, slope: -15e3, start: 820 }], straights: [{ end: 720, frontType: 2, start: 200 }, { end: 1600, frontType: 1, start: 1270 }], surface: 1, turn: 1 }, "10805": { corners: [{ length: 250, start: 700 }, { length: 250, start: 950 }], course: 3, courseSetStatus: [1], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 450 }, { length: 225, slope: 1e4, start: 550 }, { length: 150, slope: -2e4, start: 775 }], straights: [{ end: 700, frontType: 2, start: 200 }, { end: 1600, frontType: 1, start: 1200 }], surface: 1, turn: 1 }, "10806": { corners: [{ length: 250, start: 900 }, { length: 250, start: 1150 }], course: 3, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 650 }, { length: 225, slope: 1e4, start: 750 }, { length: 150, slope: -2e4, start: 975 }], straights: [{ end: 900, frontType: 2, start: 400 }, { end: 1800, frontType: 1, start: 1400 }], surface: 1, turn: 1 }, "10807": { corners: [{ length: 185, start: 400 }, { length: 185, start: 585 }, { length: 250, start: 1170 }, { length: 250, start: 1420 }], course: 2, courseSetStatus: [3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 175, slope: 15e3, start: 970 }, { length: 150, slope: -15e3, start: 1270 }], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1170, frontType: 2, start: 770 }, { end: 2e3, frontType: 1, start: 1670 }], surface: 1, turn: 1 }, "10808": { corners: [{ length: 200, start: 400 }, { length: 200, start: 600 }, { length: 250, start: 1300 }, { length: 250, start: 1550 }], course: 3, courseSetStatus: [1], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 1050 }, { length: 225, slope: 1e4, start: 1150 }, { length: 150, slope: -2e4, start: 1375 }], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 800 }, { end: 2200, frontType: 1, start: 1800 }], surface: 1, turn: 1 }, "10809": { corners: [{ length: 200, start: 600 }, { length: 200, start: 800 }, { length: 250, start: 1500 }, { length: 250, start: 1750 }], course: 3, courseSetStatus: [3], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 1250 }, { length: 225, slope: 1e4, start: 1350 }, { length: 150, slope: -2e4, start: 1575 }], straights: [{ end: 600, frontType: 1, start: 0 }, { end: 1500, frontType: 2, start: 1e3 }, { end: 2400, frontType: 1, start: 2e3 }], surface: 1, turn: 1 }, "10810": { corners: [{ length: 250, start: 261 }, { length: 250, start: 511 }, { length: 200, start: 1250 }, { length: 200, start: 1450 }, { length: 250, start: 2100 }, { length: 250, start: 2350 }], course: 3, courseSetStatus: [3, 5], distance: 3e3, distanceType: 4, finishTimeMax: 19e5, finishTimeMin: 1815e3, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 11 }, { length: 225, slope: 1e4, start: 111 }, { length: 150, slope: -2e4, start: 336 }, { length: 100, slope: 2e4, start: 1850 }, { length: 225, slope: 1e4, start: 1950 }, { length: 150, slope: -2e4, start: 2175 }], straights: [{ end: 261, frontType: 2, start: 0 }, { end: 1250, frontType: 1, start: 761 }, { end: 2100, frontType: 2, start: 1650 }, { end: 3e3, frontType: 1, start: 2600 }], surface: 1, turn: 1 }, "10811": { corners: [{ length: 250, start: 458 }, { length: 250, start: 708 }, { length: 200, start: 1450 }, { length: 200, start: 1650 }, { length: 250, start: 2300 }, { length: 250, start: 2550 }], course: 3, courseSetStatus: [], distance: 3200, distanceType: 4, finishTimeMax: 204e4, finishTimeMin: 193e4, laneMax: 14100, raceTrackId: 10008, slopes: [{ length: 100, slope: 2e4, start: 208 }, { length: 225, slope: 1e4, start: 308 }, { length: 150, slope: -2e4, start: 533 }, { length: 100, slope: 2e4, start: 2050 }, { length: 225, slope: 1e4, start: 2150 }, { length: 150, slope: -2e4, start: 2375 }], straights: [{ end: 458, frontType: 2, start: 0 }, { end: 1450, frontType: 1, start: 958 }, { end: 2300, frontType: 2, start: 1850 }, { end: 3200, frontType: 1, start: 2800 }], surface: 1, turn: 1 }, "10812": { corners: [{ length: 225, start: 400 }, { length: 225, start: 625 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 175 }, { length: 200, slope: -15e3, start: 475 }], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 850 }], surface: 2, turn: 1 }, "10813": { corners: [{ length: 225, start: 600 }, { length: 225, start: 825 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 375 }, { length: 200, slope: -15e3, start: 675 }], straights: [{ end: 600, frontType: 2, start: 100 }, { end: 1400, frontType: 1, start: 1050 }], surface: 2, turn: 1 }, "10814": { corners: [{ length: 150, start: 300 }, { length: 150, start: 450 }, { length: 225, start: 1e3 }, { length: 225, start: 1225 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 775 }, { length: 200, slope: -15e3, start: 1075 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 1e3, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1450 }], surface: 2, turn: 1 }, "10815": { corners: [{ length: 150, start: 400 }, { length: 150, start: 550 }, { length: 225, start: 1100 }, { length: 225, start: 1325 }], course: 1, courseSetStatus: [], distance: 1900, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1142e3, laneMax: 13e3, raceTrackId: 10008, slopes: [{ length: 200, slope: 15e3, start: 875 }, { length: 200, slope: -15e3, start: 1175 }], straights: [{ end: 400, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1900, frontType: 1, start: 1550 }], surface: 2, turn: 1 }, "10901": { corners: [{ length: 300, start: 250 }, { length: 300, start: 550 }], course: 2, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 595, slope: -1e4, start: 400 }, { length: 125, slope: 2e4, start: 1e3 }], straights: [{ end: 250, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 850 }], surface: 1, turn: 1 }, "10902": { corners: [{ length: 300, start: 450 }, { length: 300, start: 750 }], course: 2, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 84e4, finishTimeMin: 8e5, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 595, slope: -1e4, start: 600 }, { length: 125, slope: 2e4, start: 1200 }], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1050 }], surface: 1, turn: 1 }, "10903": { corners: [{ length: 350, start: 450 }, { length: 350, start: 800 }], course: 3, courseSetStatus: [3], distance: 1600, distanceType: 2, finishTimeMax: 95e4, finishTimeMin: 908e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 400, slope: -1e4, start: 950 }, { length: 120, slope: 2e4, start: 1405 }], straights: [{ end: 450, frontType: 2, start: 0 }, { end: 1600, frontType: 1, start: 1150 }], surface: 1, turn: 1 }, "10904": { corners: [{ length: 350, start: 650 }, { length: 350, start: 1e3 }], course: 3, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 400, slope: -1e4, start: 1150 }, { length: 120, slope: 2e4, start: 1605 }], straights: [{ end: 650, frontType: 2, start: 0 }, { end: 1800, frontType: 1, start: 1350 }], surface: 1, turn: 1 }, "10905": { corners: [{ length: 190, start: 370 }, { length: 190, start: 560 }, { length: 300, start: 1050 }, { length: 300, start: 1350 }], course: 2, courseSetStatus: [4], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 140, slope: -1e4, start: 0 }, { length: 125, slope: 2e4, start: 145 }, { length: 595, slope: -1e4, start: 1200 }, { length: 125, slope: 2e4, start: 1800 }], straights: [{ end: 370, frontType: 1, start: 0 }, { end: 1050, frontType: 2, start: 750 }, { end: 2e3, frontType: 1, start: 1650 }], surface: 1, turn: 1 }, "10906": { corners: [{ length: 190, start: 520 }, { length: 190, start: 710 }, { length: 300, start: 1250 }, { length: 300, start: 1550 }], course: 2, courseSetStatus: [1], distance: 2200, distanceType: 3, finishTimeMax: 135e4, finishTimeMin: 1302e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 290, slope: -1e4, start: 0 }, { length: 125, slope: 2e4, start: 295 }, { length: 595, slope: -1e4, start: 1400 }, { length: 125, slope: 2e4, start: 2e3 }], straights: [{ end: 520, frontType: 1, start: 0 }, { end: 1250, frontType: 2, start: 900 }, { end: 2200, frontType: 1, start: 1850 }], surface: 1, turn: 1 }, "10907": { corners: [{ length: 190, start: 382 }, { length: 190, start: 558 }, { length: 350, start: 1250 }, { length: 350, start: 1600 }], course: 3, courseSetStatus: [3], distance: 2400, distanceType: 3, finishTimeMax: 149e4, finishTimeMin: 1416e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 132, slope: -1e4, start: 0 }, { length: 120, slope: 2e4, start: 187 }, { length: 400, slope: -1e4, start: 1750 }, { length: 120, slope: 2e4, start: 2205 }], straights: [{ end: 1250, frontType: 2, start: 750 }, { end: 2400, frontType: 1, start: 1950 }], surface: 1, turn: 1 }, "10908": { corners: [{ length: 190, start: 570 }, { length: 190, start: 760 }, { length: 350, start: 1450 }, { length: 350, start: 1800 }], course: 3, courseSetStatus: [], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 315, slope: -1e4, start: 0 }, { length: 120, slope: 2e4, start: 370 }, { length: 400, slope: -1e4, start: 1950 }, { length: 120, slope: 2e4, start: 2405 }], straights: [{ end: 570, frontType: 1, start: 0 }, { end: 1450, frontType: 2, start: 950 }, { end: 2600, frontType: 1, start: 2150 }], surface: 1, turn: 1 }, "10909": { corners: [{ length: 300, start: 348 }, { length: 300, start: 648 }, { length: 190, start: 1320 }, { length: 190, start: 1510 }, { length: 300, start: 2050 }, { length: 300, start: 2350 }], course: 2, courseSetStatus: [3], distance: 3e3, distanceType: 4, finishTimeMax: 19e5, finishTimeMin: 1815e3, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 595, slope: -1e4, start: 498 }, { length: 125, slope: 2e4, start: 1095 }, { length: 595, slope: -1e4, start: 2200 }, { length: 125, slope: 2e4, start: 2800 }], straights: [{ end: 348, frontType: 2, start: 0 }, { end: 1320, frontType: 1, start: 948 }, { end: 2050, frontType: 2, start: 1700 }, { end: 3e3, frontType: 1, start: 2650 }], surface: 1, turn: 1 }, "10910": { corners: [{ length: 250, start: 350 }, { length: 250, start: 600 }], course: 1, courseSetStatus: [], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 12e3, raceTrackId: 10009, slopes: [], straights: [{ end: 350, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 850 }], surface: 2, turn: 1 }, "10911": { corners: [{ length: 250, start: 550 }, { length: 250, start: 800 }], course: 1, courseSetStatus: [], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 808e3, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 125, slope: 15e3, start: 1200 }], straights: [{ end: 550, frontType: 2, start: 0 }, { end: 1400, frontType: 1, start: 1050 }], surface: 2, turn: 1 }, "10912": { corners: [{ length: 150, start: 330 }, { length: 150, start: 480 }, { length: 250, start: 950 }, { length: 250, start: 1200 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 125, slope: 15e3, start: 105 }, { length: 125, slope: 15e3, start: 1599 }], straights: [{ end: 330, frontType: 1, start: 0 }, { end: 950, frontType: 2, start: 630 }, { end: 1800, frontType: 1, start: 1449 }], surface: 2, turn: 1 }, "10913": { corners: [{ length: 150, start: 500 }, { length: 150, start: 650 }, { length: 250, start: 1150 }, { length: 250, start: 1400 }], course: 1, courseSetStatus: [2, 3], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 1219e3, laneMax: 12e3, raceTrackId: 10009, slopes: [{ length: 125, slope: 15e3, start: 275 }, { length: 125, slope: 15e3, start: 1800 }], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1150, frontType: 2, start: 800 }, { end: 2e3, frontType: 1, start: 1650 }], surface: 2, turn: 1 }, "10914": { corners: [{ length: 350, start: 370 }, { length: 350, start: 720 }, { length: 190, start: 1520 }, { length: 190, start: 1710 }, { length: 300, start: 2250 }, { length: 300, start: 2550 }], course: 4, courseSetStatus: [], distance: 3200, distanceType: 4, finishTimeMax: 204e4, finishTimeMin: 193e4, laneMax: 12500, raceTrackId: 10009, slopes: [{ length: 400, slope: -1e4, start: 870 }, { length: 120, slope: 2e4, start: 1325 }, { length: 595, slope: -1e4, start: 2400 }, { length: 125, slope: 2e4, start: 3e3 }], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1520, frontType: 1, start: 1070 }, { end: 2250, frontType: 2, start: 1900 }, { end: 3200, frontType: 1, start: 2850 }], surface: 1, turn: 1 }, "11001": { corners: [{ length: 205, start: 500 }, { length: 205, start: 705 }], course: 1, courseSetStatus: [1], distance: 1200, distanceType: 1, finishTimeMax: 71e4, finishTimeMin: 675e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 60, slope: -15e3, start: 0 }], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 910 }], surface: 1, turn: 1 }, "11002": { corners: [{ length: 205, start: 290 }, { length: 205, start: 495 }, { length: 205, start: 1100 }, { length: 205, start: 1305 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 11e5, finishTimeMin: 1044e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 255, slope: 15e3, start: 280 }], straights: [{ end: 290, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1800, frontType: 1, start: 1510 }], surface: 1, turn: 1 }, "11003": { corners: [{ length: 205, start: 490 }, { length: 205, start: 695 }, { length: 205, start: 1300 }, { length: 205, start: 1505 }], course: 1, courseSetStatus: [3], distance: 2e3, distanceType: 3, finishTimeMax: 123e4, finishTimeMin: 1171e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 255, slope: 15e3, start: 480 }], straights: [{ end: 490, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 900 }, { end: 2e3, frontType: 1, start: 1710 }], surface: 1, turn: 1 }, "11004": { corners: [{ length: 205, start: 309 }, { length: 205, start: 514 }, { length: 205, start: 1110 }, { length: 205, start: 1315 }, { length: 205, start: 1900 }, { length: 205, start: 2105 }], course: 1, courseSetStatus: [2], distance: 2600, distanceType: 4, finishTimeMax: 165e4, finishTimeMin: 1576e3, laneMax: 14500, raceTrackId: 10010, slopes: [{ length: 255, slope: 15e3, start: 1100 }], straights: [{ end: 309, frontType: 2, start: 0 }, { end: 1110, frontType: 1, start: 719 }, { end: 1900, frontType: 2, start: 1520 }, { end: 2600, frontType: 1, start: 2310 }], surface: 1, turn: 1 }, "11005": { corners: [{ length: 180, start: 360 }, { length: 180, start: 540 }], course: 1, courseSetStatus: [1], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 574e3, laneMax: 12e3, raceTrackId: 10010, slopes: [], straights: [{ end: 360, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 720 }], surface: 2, turn: 1 }, "11006": { corners: [{ length: 180, start: 340 }, { length: 180, start: 520 }, { length: 180, start: 1060 }, { length: 180, start: 1240 }], course: 1, courseSetStatus: [], distance: 1700, distanceType: 2, finishTimeMax: 113e4, finishTimeMin: 1014e3, laneMax: 12e3, raceTrackId: 10010, slopes: [{ length: 150, slope: 15e3, start: 370 }], straights: [{ end: 340, frontType: 1, start: 0 }, { end: 1060, frontType: 2, start: 700 }, { end: 1700, frontType: 1, start: 1420 }], surface: 2, turn: 1 }, "11007": { corners: [{ length: 180, start: 312 }, { length: 180, start: 492 }, { length: 180, start: 1040 }, { length: 180, start: 1220 }, { length: 180, start: 1760 }, { length: 180, start: 1940 }], course: 1, courseSetStatus: [], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 1491e3, laneMax: 12e3, raceTrackId: 10010, slopes: [], straights: [{ end: 312, frontType: 2, start: 0 }, { end: 1040, frontType: 1, start: 672 }, { end: 1760, frontType: 2, start: 1400 }, { end: 2400, frontType: 1, start: 2120 }], surface: 2, turn: 1 }, "11101": { corners: [{ length: 150, start: 500 }, { length: 150, start: 650 }], course: 1, courseSetStatus: [4, 5], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 12e3, raceTrackId: 10101, slopes: [], straights: [{ end: 500, frontType: 2, start: 0 }, { end: 1200, frontType: 1, start: 812 }], surface: 2, turn: 1 }, "11102": { corners: [{ length: 150, start: 300 }, { length: 150, start: 500 }, { length: 150, start: 1100 }, { length: 150, start: 1250 }], course: 1, courseSetStatus: [3], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 1081e3, laneMax: 12e3, raceTrackId: 10101, slopes: [], straights: [{ end: 301, frontType: 1, start: 0 }, { end: 1100.23, frontType: 2, start: 600 }, { end: 1800, frontType: 1, start: 1400 }], surface: 2, turn: 1 }, "11103": { corners: [{ length: 150, start: 500 }, { length: 150, start: 650 }, { length: 150, start: 1300 }, { length: 150, start: 1450 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 1219e3, laneMax: 12e3, raceTrackId: 10101, slopes: [], straights: [{ end: 500, frontType: 1, start: 0 }, { end: 1300, frontType: 2, start: 800 }, { end: 2e3, frontType: 1, start: 1600 }], surface: 2, turn: 1 }, "11301": { corners: [{ length: 100, start: 300 }, { length: 100, start: 400 }, { length: 100, start: 900 }, { length: 100, start: 1e3 }], course: 1, courseSetStatus: [5], distance: 1400, distanceType: 1, finishTimeMax: 94e4, finishTimeMin: 87e4, laneMax: 13500, raceTrackId: 10103, slopes: [], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 900, frontType: 2, start: 500 }, { end: 1400, frontType: 1, start: 1100 }], surface: 2, turn: 2 }, "11302": { corners: [{ length: 100, start: 500 }, { length: 100, start: 600 }, { length: 100, start: 1100 }, { length: 100, start: 1200 }], course: 1, courseSetStatus: [5], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 98e4, laneMax: 13500, raceTrackId: 10103, slopes: [], straights: [{ end: 500, frontType: 1, start: 100 }, { end: 1100, frontType: 2, start: 700 }, { end: 1600, frontType: 1, start: 1300 }], surface: 2, turn: 2 }, "11303": { corners: [{ length: 100, start: 400 }, { length: 100, start: 500 }, { length: 100, start: 1e3 }, { length: 100, start: 1100 }, { length: 100, start: 1600 }, { length: 100, start: 1700 }], course: 1, courseSetStatus: [2, 5], distance: 2100, distanceType: 3, finishTimeMax: 14e5, finishTimeMin: 131e4, laneMax: 13500, raceTrackId: 10103, slopes: [], straights: [{ end: 400, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 600 }, { end: 1600, frontType: 2, start: 1200 }, { end: 2100, frontType: 1, start: 1800 }], surface: 2, turn: 2 }, "11401": { corners: [{ length: 170, start: 370 }, { length: 150, start: 540 }], course: 1, courseSetStatus: [1], distance: 1e3, distanceType: 1, finishTimeMax: 63e4, finishTimeMin: 58e4, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1e3, frontType: 1, start: 690 }], surface: 2, turn: 2 }, "11402": { corners: [{ length: 180, start: 260 }, { length: 160, start: 440 }, { length: 170, start: 970 }, { length: 150, start: 1140 }], course: 1, courseSetStatus: [], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 96e4, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 260, frontType: 1, start: 0 }, { end: 970, frontType: 2, start: 600 }, { end: 1600, frontType: 1, start: 1290 }], surface: 2, turn: 2 }, "11403": { corners: [{ length: 180, start: 460 }, { length: 160, start: 640 }, { length: 170, start: 1170 }, { length: 150, start: 1340 }], course: 1, courseSetStatus: [], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 108e4, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 460, frontType: 1, start: 90 }, { end: 1170, frontType: 2, start: 800 }, { end: 1800, frontType: 1, start: 1490 }], surface: 2, turn: 2 }, "11404": { corners: [{ length: 170, start: 370 }, { length: 150, start: 540 }, { length: 180, start: 1060 }, { length: 160, start: 1240 }, { length: 170, start: 1770 }, { length: 150, start: 1940 }], course: 1, courseSetStatus: [2], distance: 2400, distanceType: 3, finishTimeMax: 156e4, finishTimeMin: 15e5, laneMax: 13500, raceTrackId: 10104, slopes: [], straights: [{ end: 370, frontType: 2, start: 0 }, { end: 1060, frontType: 1, start: 690 }, { end: 1770, frontType: 2, start: 1400 }, { end: 2400, frontType: 1, start: 2090 }], surface: 2, turn: 2 }, "11501": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }], course: 1, courseSetStatus: [2], distance: 1200, distanceType: 1, finishTimeMax: 77e4, finishTimeMin: 69e4, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 375, slope: 1e4, start: 100 }, { length: 450, slope: -15e3, start: 475 }, { length: 175, slope: 1e4, start: 975 }], straights: [{ end: 500, frontType: 2, start: 100 }, { end: 1200, frontType: 1, start: 900 }], surface: 2, turn: 2 }, "11502": { corners: [{ length: 200, start: 900 }, { length: 200, start: 1100 }], course: 1, courseSetStatus: [2, 5], distance: 1600, distanceType: 2, finishTimeMax: 108e4, finishTimeMin: 93e4, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 375, slope: 1e4, start: 500 }, { length: 450, slope: -15e3, start: 875 }, { length: 175, slope: 1e4, start: 1375 }], straights: [{ end: 900, frontType: 2, start: 500 }, { end: 1600, frontType: 1, start: 1300 }], surface: 2, turn: 2 }, "11503": { corners: [{ length: 200, start: 300 }, { length: 200, start: 500 }, { length: 200, start: 1100 }, { length: 200, start: 1300 }], course: 1, courseSetStatus: [2, 5], distance: 1800, distanceType: 2, finishTimeMax: 118e4, finishTimeMin: 11e5, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 150, slope: 1e4, start: 0 }, { length: 450, slope: -15e3, start: 700 }, { length: 175, slope: 1e4, start: 1575 }], straights: [{ end: 300, frontType: 1, start: 0 }, { end: 1100, frontType: 2, start: 700 }, { end: 1800, frontType: 1, start: 1500 }], surface: 2, turn: 2 }, "11504": { corners: [{ length: 200, start: 500 }, { length: 200, start: 700 }, { length: 200, start: 1300 }, { length: 200, start: 1500 }], course: 1, courseSetStatus: [2], distance: 2e3, distanceType: 3, finishTimeMax: 129e4, finishTimeMin: 121e4, laneMax: 13500, raceTrackId: 10105, slopes: [{ length: 175, slope: 1e4, start: 175 }, { length: 375, slope: 1e4, start: 900 }, { length: 450, slope: -15e3, start: 1275 }, { length: 175, slope: 1e4, start: 1775 }], straights: [{ end: 500, frontType: 1, start: 100 }, { end: 1300, frontType: 2, start: 900 }, { end: 2e3, frontType: 1, start: 1700 }], surface: 2, turn: 2 } };

// ../uma-tools/uma-skill-tools/CourseData.ts
var Surface = /* @__PURE__ */ ((Surface2) => {
  Surface2[Surface2["Turf"] = 1] = "Turf";
  Surface2[Surface2["Dirt"] = 2] = "Dirt";
  return Surface2;
})(Surface || {});
var DistanceType = /* @__PURE__ */ ((DistanceType3) => {
  DistanceType3[DistanceType3["Short"] = 1] = "Short";
  DistanceType3[DistanceType3["Mile"] = 2] = "Mile";
  DistanceType3[DistanceType3["Mid"] = 3] = "Mid";
  DistanceType3[DistanceType3["Long"] = 4] = "Long";
  return DistanceType3;
})(DistanceType || {});
var Orientation = /* @__PURE__ */ ((Orientation2) => {
  Orientation2[Orientation2["Clockwise"] = 1] = "Clockwise";
  Orientation2[Orientation2["Counterclockwise"] = 2] = "Counterclockwise";
  Orientation2[Orientation2["UnusedOrientation"] = 3] = "UnusedOrientation";
  Orientation2[Orientation2["NoTurns"] = 4] = "NoTurns";
  return Orientation2;
})(Orientation || {});
var CourseHelpers;
((CourseHelpers2) => {
  function assertIsPhase(phase) {
    (0, import_node_assert2.strict)(phase == 0 || phase == 1 || phase == 2 || phase == 3);
  }
  CourseHelpers2.assertIsPhase = assertIsPhase;
  function assertIsSurface(surface) {
    (0, import_node_assert2.strict)(Surface.hasOwnProperty(surface));
  }
  CourseHelpers2.assertIsSurface = assertIsSurface;
  function assertIsDistanceType(distanceType) {
    (0, import_node_assert2.strict)(DistanceType.hasOwnProperty(distanceType));
  }
  CourseHelpers2.assertIsDistanceType = assertIsDistanceType;
  function assertIsOrientation(orientation) {
    (0, import_node_assert2.strict)(Orientation.hasOwnProperty(orientation));
  }
  CourseHelpers2.assertIsOrientation = assertIsOrientation;
  function isSortedByStart(arr) {
    const init = [true, -1];
    function isSorted(a, b) {
      return [a[0] && b.start > a[1], b.start];
    }
    return arr.reduce(isSorted, init)[0];
  }
  CourseHelpers2.isSortedByStart = isSortedByStart;
  function phaseStart(distance, phase) {
    switch (phase) {
      case 0:
        return 0;
      case 1:
        return distance * 1 / 6;
      case 2:
        return distance * 2 / 3;
      case 3:
        return distance * 5 / 6;
    }
  }
  CourseHelpers2.phaseStart = phaseStart;
  function phaseEnd(distance, phase) {
    switch (phase) {
      case 0:
        return distance * 1 / 6;
      case 1:
        return distance * 2 / 3;
      case 2:
        return distance * 5 / 6;
      case 3:
        return distance;
    }
  }
  CourseHelpers2.phaseEnd = phaseEnd;
  function courseSpeedModifier(course, stats) {
    const statvalues = [0, stats.speed, stats.stamina, stats.power, stats.guts, stats.wisdom].map((x) => Math.min(x, 901));
    return 1 + course.courseSetStatus.map(
      (stat) => (1 + Math.floor(statvalues[stat] / 300.01)) * 0.05
    ).reduce((a, b) => a + b, 0) / Math.max(course.courseSetStatus.length, 1);
  }
  CourseHelpers2.courseSpeedModifier = courseSpeedModifier;
  function getCourse(courseId) {
    const course = course_data_default[courseId];
    if (!isSortedByStart(course.slopes))
      course.slopes.sort((a, b) => a.start - b.start);
    Object.keys(course).forEach((k) => Object.freeze(course[k]));
    return Object.freeze(course);
  }
  CourseHelpers2.getCourse = getCourse;
})(CourseHelpers || (CourseHelpers = {}));

// ../uma-tools/uma-skill-tools/Region.ts
var Region = class _Region {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  intersect(other) {
    const start = Math.max(this.start, other.start);
    const end = Math.min(this.end, other.end);
    if (end <= start) {
      return new _Region(-1, -1);
    } else {
      return new _Region(start, end);
    }
  }
  fullyContains(other) {
    return this.start <= other.start && this.end >= other.end;
  }
};
var RegionList = class _RegionList extends Array {
  rmap(f) {
    const out = new _RegionList();
    this.forEach((r) => {
      const newr = f(r);
      if (Array.isArray(newr)) {
        newr.forEach((nr) => {
          if (nr.start > -1) {
            out.push(nr);
          }
        });
      } else if (newr.start > -1) {
        out.push(newr);
      }
    });
    return out;
  }
  union(other) {
    const u = [];
    const r = new _RegionList();
    u.push.apply(u, this);
    u.push.apply(u, other);
    if (u.length == 0) {
      return r;
    }
    u.sort((a, b) => a.start - b.start);
    r.push(u.reduce((a, b) => {
      if (a.fullyContains(b)) {
        return a;
      } else if (a.start <= b.start && b.start < a.end) {
        return new Region(a.start, b.end);
      } else if (a.start < b.end && b.end <= a.end) {
        return new Region(b.start, a.end);
      } else {
        r.push(a);
        return b;
      }
    }));
    return r;
  }
};

// ../uma-tools/uma-skill-tools/Random.ts
var Rule30CARng = class {
  constructor(seedLo, seedHi = 0) {
    // for very slightly better statistical properties
    //
    //     int32() {
    //         let k = 0;
    //         for (let i = 0; i < 32; ++i) {
    //             k = (k << 1) | (this.lo & 1);
    //             this.step();
    //         }
    //         return k >>> 0;
    //     }
    //
    // (obviously, would also have to also change random() to use int32())
    // this is about 3× slower
    this.int32 = this.int32_first;
    this.hi = seedHi >>> 0;
    this.lo = seedLo >>> 0;
  }
  step() {
    let rot = this.hi >>> 31;
    const rolhi = this.hi << 1 | this.lo >>> 31;
    const rollo = this.lo << 1 | rot;
    rot = this.hi << 31;
    const rorhi = this.hi >>> 1 | this.lo << 31;
    const rorlo = this.lo >>> 1 | rot;
    this.hi = rorhi ^ (this.hi | rolhi);
    this.lo = rorlo ^ (this.lo | rollo);
  }
  // NB. when sampling multiple bits it is MUCH BETTER to generate two integers at once like this
  // generating just `x` fails a PractRand FPF test at 4mb while using both is good until Node runs out of memory (“suspicious” DC6
  // result at 16mb)
  // why? i have no idea. it's convenient for the floats, at least. but you'd think it would be worse since the output should be more
  // correlated this way. who knows.
  // incidentally, there's a huge amount of design space here to explore which i have barely scratched the surface of. what bits to
  // sample, whether to sample both halves (hi and lo) of the state or just one, etc.
  // the current implementation has been arrived at experimentally using PractRand but is by no means the optimal design
  // oddly enough trying to make use of both hi and lo tends to make the results significantly worse, but it doesn't seem to matter much
  // which one is used. my initial thought was to use only lo since the right half of rule 30 is well-known to be more chaotic than the
  // left half. however hi does slightly better in practice, with no anomalies until 16mb. i suppose since it's circular the usual
  // left/right separation of rule 30 doesn't really apply?
  // ideally, it would be nice to get down to something that has good enough randomness but generates 8 bits per CA step instead of 4
  pair() {
    let x = 0 >>> 0, y = 0 >>> 0;
    for (let i = 0; i < 16; ++i) {
      x = x << 2 | (this.hi & 65536) >>> 15 | this.hi & 1;
      y = y << 2 | (this.hi & 16777216) >>> 23 | (this.hi & 256) >>> 8;
      this.step();
    }
    return [x, y];
  }
  int32_first() {
    let [x, y] = this.pair();
    this.next = y;
    this.int32 = this.int32_second;
    return x;
  }
  int32_second() {
    this.int32 = this.int32_first;
    return this.next;
  }
  random() {
    const MASK_HI = 67108863 >>> 0;
    const MASK_LO = 134217727 >>> 0;
    const EXP = 134217728;
    const MANT = 9007199254740992;
    const [hi, lo] = this.pair();
    return ((hi & MASK_HI) * EXP + (lo & MASK_LO)) / MANT;
  }
  uniform(upper) {
    const mask = -1 >>> Math.clz32(upper - 1 | 1);
    let n = 0;
    do {
      n = this.int32() & mask;
    } while (n >= upper);
    return n;
  }
};

// ../uma-tools/uma-skill-tools/ActivationConditions.ts
var import_node_assert3 = require("node:assert");

// ../uma-tools/uma-skill-tools/ActivationSamplePolicy.ts
var ImmediatePolicy = Object.freeze({
  sample(regions, _0, _1) {
    return regions.slice(0, 1);
  },
  reconcile(other) {
    return other.reconcileImmediate(this);
  },
  reconcileImmediate(other) {
    return other;
  },
  reconcileDistributionRandom(other) {
    return other;
  },
  reconcileRandom(other) {
    return other;
  },
  reconcileStraightRandom(other) {
    return other;
  },
  reconcileAllCornerRandom(other) {
    return other;
  }
});
var RandomPolicy = Object.freeze({
  sample(regions, nsamples, rng) {
    if (regions.length == 0) {
      return [];
    }
    let acc = 0;
    const weights = regions.map((r) => acc += r.end - r.start);
    const samples = [];
    for (let i = 0; i < nsamples; ++i) {
      const threshold = rng.uniform(acc);
      const region = regions.find((_, i2) => weights[i2] > threshold);
      samples.push(region.start + rng.uniform(region.end - region.start - 10));
    }
    return samples.map((pos) => new Region(pos, pos + 10));
  },
  reconcile(other) {
    return other.reconcileRandom(this);
  },
  reconcileImmediate(_) {
    return this;
  },
  reconcileDistributionRandom(other) {
    return this;
  },
  reconcileRandom(other) {
    return other;
  },
  reconcileStraightRandom(other) {
    return other;
  },
  reconcileAllCornerRandom(other) {
    return other;
  }
});
var DistributionRandomPolicy = class {
  sample(regions, nsamples, rng) {
    if (regions.length == 0) {
      return [];
    }
    const range = regions.reduce((acc, r) => acc + r.end - r.start, 0);
    const rs = regions.slice().sort((a, b) => a.start - b.start);
    const randoms = this.distribution(range, nsamples, rng);
    const samples = [];
    for (let i = 0; i < nsamples; ++i) {
      let pos = randoms[i];
      for (let j = 0; ; j++) {
        pos += rs[j].start;
        if (pos > rs[j].end) {
          pos -= rs[j].end;
        } else {
          samples.push(new Region(pos, rs[j].end));
          break;
        }
      }
    }
    return samples;
  }
  reconcile(other) {
    return other.reconcileDistributionRandom(this);
  }
  reconcileImmediate(_) {
    return this;
  }
  reconcileDistributionRandom(other) {
    return this;
  }
  // this is probably not exactly the right thing to do either, but the true random conditions do need to place a fixed trigger
  // statically ahead of time, uninfluenced by us. this means that the only alternatives are 1) this condition is coincidentally
  // fulfilled during the static random trigger or 2) the skill does not activate at all.
  // since the latter is not particularly interesting, it's safe to just ignore this sample policy and use only the true random one.
  reconcileRandom(other) {
    return other;
  }
  reconcileStraightRandom(other) {
    return other;
  }
  reconcileAllCornerRandom(other) {
    return other;
  }
};
var UniformRandomPolicy = class extends DistributionRandomPolicy {
  constructor() {
    super();
  }
  distribution(upper, nsamples, rng) {
    const nums = [];
    for (let i = 0; i < nsamples; ++i) {
      nums.push(rng.uniform(upper));
    }
    return nums;
  }
};
var LogNormalRandomPolicy = class extends DistributionRandomPolicy {
  constructor(mu, sigma) {
    super();
    this.mu = mu;
    this.sigma = sigma;
  }
  distribution(upper, nsamples, rng) {
    let nums = [], min = Infinity, max = 0;
    const halfn = Math.ceil(nsamples / 2);
    for (let i = 0; i < halfn; ++i) {
      let x, y, r2;
      do {
        x = rng.random() * 2 - 1;
        y = rng.random() * 2 - 1;
        r2 = x * x + y * y;
      } while (r2 == 0 || r2 >= 1);
      const m = Math.sqrt(-2 * Math.log(r2) / r2) * this.sigma;
      const a = Math.exp(x * m + this.mu);
      const b = Math.exp(y * m + this.mu);
      min = Math.min(min, a, b);
      max = Math.max(max, a, b);
      nums.push(a, b);
    }
    const range = max - min;
    return nums.map((n) => Math.floor(upper * (n - min) / range));
  }
};
var ErlangRandomPolicy = class extends DistributionRandomPolicy {
  constructor(k, lambda) {
    super();
    this.k = k;
    this.lambda = lambda;
  }
  distribution(upper, nsamples, rng) {
    const nums = [];
    let min = Infinity, max = 0;
    for (let i = 0; i < nsamples; ++i) {
      let u = 1;
      for (let j = 0; j < this.k; ++j) {
        u *= rng.random();
      }
      const n = -Math.log(u) / this.lambda;
      min = Math.min(min, n);
      max = Math.max(max, n);
      nums.push(n);
    }
    const range = nsamples == 1 ? 18 : max - min;
    return nums.map((n) => Math.floor(upper * (n - min) / range));
  }
};
var StraightRandomPolicy = Object.freeze({
  sample(regions, nsamples, rng) {
    if (regions.length == 0) {
      return [];
    }
    const samples = [];
    for (let i = 0; i < nsamples; ++i) {
      const r = regions[rng.uniform(regions.length)];
      samples.push(r.start + rng.uniform(r.end - r.start - 10));
    }
    return samples.map((pos) => new Region(pos, pos + 10));
  },
  reconcile(other) {
    return other.reconcileStraightRandom(this);
  },
  reconcileImmediate(_) {
    return this;
  },
  reconcileDistributionRandom(_) {
    return this;
  },
  reconcileRandom(_) {
    return this;
  },
  reconcileStraightRandom(other) {
    return other;
  },
  reconcileAllCornerRandom(other) {
    throw new Error("cannot reconcile StraightRandomPolicy with AllCornerRandomPolicy");
  }
});
var AllCornerRandomPolicy = Object.freeze({
  placeTriggers(regions, rng) {
    const triggers = [];
    const candidates = regions.slice();
    candidates.sort((a, b) => a.start - b.start);
    while (triggers.length < 4 && candidates.length > 0) {
      const ci = rng.uniform(candidates.length);
      const c = candidates[ci];
      const start = c.start + rng.uniform(c.end - c.start - 10);
      if (start + 20 <= c.end) {
        candidates.splice(ci, 1, new Region(start + 10, c.end));
      } else {
        candidates.splice(ci, 1);
      }
      candidates.splice(0, ci);
      triggers.push(start);
    }
    return new Region(triggers[0], triggers[0] + 10);
  },
  sample(regions, nsamples, rng) {
    const samples = [];
    for (let i = 0; i < nsamples; ++i) {
      samples.push(this.placeTriggers(regions, rng));
    }
    return samples;
  },
  reconcile(other) {
    return other.reconcileAllCornerRandom(this);
  },
  reconcileImmediate(_) {
    return this;
  },
  reconcileDistributionRandom(_) {
    return this;
  },
  reconcileRandom(_) {
    return this;
  },
  reconcileStraightRandom(_) {
    throw new Error("cannot reconcile StraightRandomPolicy with AllCornerRandomPolicy");
  },
  reconcileAllCornerRandom(_) {
    return this;
  }
});

// ../uma-tools/uma-skill-tools/ActivationConditions.ts
function kTrue(_) {
  return true;
}
function withDefaultCond(r) {
  if (r instanceof RegionList) {
    return [r, kTrue];
  }
  return r;
}
var EqOperator = class {
  constructor(condition, argument) {
    this.condition = condition;
    this.argument = argument;
    this.samplePolicy = condition.samplePolicy;
  }
  apply(regions, course, horse, extra) {
    return withDefaultCond(this.condition.filterEq(regions, this.argument, course, horse, extra));
  }
};
var NeqOperator = class {
  constructor(condition, argument) {
    this.condition = condition;
    this.argument = argument;
    this.samplePolicy = condition.samplePolicy;
  }
  apply(regions, course, horse, extra) {
    return withDefaultCond(this.condition.filterNeq(regions, this.argument, course, horse, extra));
  }
};
var LtOperator = class {
  constructor(condition, argument) {
    this.condition = condition;
    this.argument = argument;
    this.samplePolicy = condition.samplePolicy;
  }
  apply(regions, course, horse, extra) {
    return withDefaultCond(this.condition.filterLt(regions, this.argument, course, horse, extra));
  }
};
var LteOperator = class {
  constructor(condition, argument) {
    this.condition = condition;
    this.argument = argument;
    this.samplePolicy = condition.samplePolicy;
  }
  apply(regions, course, horse, extra) {
    return withDefaultCond(this.condition.filterLte(regions, this.argument, course, horse, extra));
  }
};
var GtOperator = class {
  constructor(condition, argument) {
    this.condition = condition;
    this.argument = argument;
    this.samplePolicy = condition.samplePolicy;
  }
  apply(regions, course, horse, extra) {
    return withDefaultCond(this.condition.filterGt(regions, this.argument, course, horse, extra));
  }
};
var GteOperator = class {
  constructor(condition, argument) {
    this.condition = condition;
    this.argument = argument;
    this.samplePolicy = condition.samplePolicy;
  }
  apply(regions, course, horse, extra) {
    return withDefaultCond(this.condition.filterGte(regions, this.argument, course, horse, extra));
  }
};
var AndOperator = class {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this.samplePolicy = left.samplePolicy.reconcile(right.samplePolicy);
  }
  apply(regions, course, horse, extra) {
    const [leftval, leftcond] = this.left.apply(regions, course, horse, extra);
    const [rightval, rightcond] = this.right.apply(leftval, course, horse, extra);
    if (leftcond === kTrue && rightcond === kTrue) {
      return [rightval, kTrue];
    }
    return [rightval, (s) => leftcond(s) && rightcond(s)];
  }
};
var OrOperator = class {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this.samplePolicy = left.samplePolicy.reconcile(right.samplePolicy);
  }
  apply(regions, course, horse, extra) {
    const [leftval, leftcond] = this.left.apply(regions, course, horse, extra);
    const [rightval, rightcond] = this.right.apply(regions, course, horse, extra);
    return [leftval.union(rightval), (s) => leftcond(s) || rightcond(s)];
  }
};
function notSupported(_0, _1, _2, _3, extra) {
  (0, import_node_assert3.strict)(false, "unsupported comparison");
  throw 0;
}
function noop(regions, _1, _2, _3, extra) {
  return regions;
}
var noopAll = Object.freeze({
  filterEq: noop,
  filterNeq: noop,
  filterLt: noop,
  filterLte: noop,
  filterGt: noop,
  filterGte: noop
});
var noopImmediate = Object.freeze(Object.assign({ samplePolicy: ImmediatePolicy }, noopAll));
var noopRandom = Object.freeze(Object.assign({ samplePolicy: RandomPolicy }, noopAll));
var defaultImmediate = Object.freeze({
  samplePolicy: ImmediatePolicy,
  filterEq: notSupported,
  filterNeq: notSupported,
  filterLt: notSupported,
  filterLte: notSupported,
  filterGt: notSupported,
  filterGte: notSupported
});
function immediate(o) {
  return Object.assign({}, defaultImmediate, o);
}
var defaultRandom = Object.freeze({
  samplePolicy: RandomPolicy,
  filterEq: notSupported,
  filterNeq: notSupported,
  filterLt: notSupported,
  filterLte: notSupported,
  filterGt: notSupported,
  filterGte: notSupported
});
function random(o) {
  return Object.assign({}, defaultRandom, o);
}
function distributionRandomFactory(cls) {
  const cache = /* @__PURE__ */ Object.create(null);
  return function(...args) {
    const o = args.pop();
    const key = args.join(",");
    const policy = key in cache ? cache[key] : cache[key] = Object.freeze(new cls(...args));
    return Object.assign({
      samplePolicy: policy,
      filterEq: notSupported,
      filterNeq: notSupported,
      filterLt: notSupported,
      filterLte: notSupported,
      filterGt: notSupported,
      filterGte: notSupported
    }, o);
  };
}
var logNormalRandom = distributionRandomFactory(LogNormalRandomPolicy);
var erlangRandom = distributionRandomFactory(ErlangRandomPolicy);
var uniformRandom = distributionRandomFactory(UniformRandomPolicy);
function noopErlangRandom(k, lambda) {
  return erlangRandom(k, lambda, noopAll);
}
var noopUniformRandom = uniformRandom(noopAll);
function noopSectionRandom(start, end) {
  function sectionRandom(regions, _0, course, _1, extra) {
    const bounds = new Region(start * (course.distance / 24), end * (course.distance / 24));
    return regions.rmap((r) => r.intersect(bounds));
  }
  return random({
    filterEq: sectionRandom,
    filterNeq: sectionRandom,
    filterLt: sectionRandom,
    filterLte: sectionRandom,
    filterGt: sectionRandom,
    filterGte: sectionRandom
  });
}
function valueFilter(getValue) {
  return immediate({
    filterEq(regions, value, course, horse, extra) {
      return getValue(course, horse, extra) == value ? regions : new RegionList();
    },
    filterNeq(regions, value, course, horse, extra) {
      return getValue(course, horse, extra) != value ? regions : new RegionList();
    },
    filterLt(regions, value, course, horse, extra) {
      return getValue(course, horse, extra) < value ? regions : new RegionList();
    },
    filterLte(regions, value, course, horse, extra) {
      return getValue(course, horse, extra) <= value ? regions : new RegionList();
    },
    filterGt(regions, value, course, horse, extra) {
      return getValue(course, horse, extra) > value ? regions : new RegionList();
    },
    filterGte(regions, value, course, horse, extra) {
      return getValue(course, horse, extra) >= value ? regions : new RegionList();
    }
  });
}
function orderFilter(getPos) {
  return immediate({
    filterEq(regions, arg, _0, _1, extra) {
      if (extra.orderRange != null) {
        const pos = getPos(arg, extra.numUmas);
        return pos >= extra.orderRange[0] && pos <= extra.orderRange[1] ? regions : new RegionList();
      }
      return regions;
    },
    filterNeq(regions, arg, _0, _1, extra) {
      if (extra.orderRange != null) {
        const pos = getPos(arg, extra.numUmas);
        return pos < extra.orderRange[0] || pos > extra.orderRange[1] ? regions : new RegionList();
      }
      return regions;
    },
    filterLt(regions, arg, course, _, extra) {
      if (extra.orderRange != null) {
        (0, import_node_assert3.strict)(1 <= extra.orderRange[0] && extra.orderRange[0] <= extra.orderRange[1]);
        const end = new Region(CourseHelpers.phaseStart(course.distance, 2) + 100, course.distance);
        const pos = getPos(arg, extra.numUmas);
        return extra.orderRange[0] < pos ? regions : regions.rmap((r) => r.intersect(end));
      }
      return regions;
    },
    filterLte(regions, arg, course, _, extra) {
      if (extra.orderRange != null) {
        (0, import_node_assert3.strict)(1 <= extra.orderRange[0] && extra.orderRange[0] <= extra.orderRange[1]);
        const end = new Region(CourseHelpers.phaseStart(course.distance, 2) + 100, course.distance);
        const pos = getPos(arg, extra.numUmas);
        return extra.orderRange[0] <= pos ? regions : regions.rmap((r) => r.intersect(end));
      }
      return regions;
    },
    filterGt(regions, arg, _0, _1, extra) {
      if (extra.orderRange != null) {
        (0, import_node_assert3.strict)(extra.orderRange[0] <= extra.orderRange[1] && extra.orderRange[1] <= extra.numUmas);
        const pos = getPos(arg, extra.numUmas);
        return pos < extra.orderRange[1] ? regions : new RegionList();
      }
      return regions;
    },
    filterGte(regions, arg, _0, _1, extra) {
      if (extra.orderRange != null) {
        (0, import_node_assert3.strict)(extra.orderRange[0] <= extra.orderRange[1] && extra.orderRange[1] <= extra.numUmas);
        const pos = getPos(arg, extra.numUmas);
        return pos <= extra.orderRange[1] ? regions : new RegionList();
      }
      return regions;
    }
  });
}
function orderInFilter(rate) {
  return immediate({
    filterEq(regions, one, _0, _1, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be order_rate_inXX_continue==1");
      if (extra.orderRange != null) {
        (0, import_node_assert3.strict)(1 <= extra.orderRange[0] && extra.orderRange[0] <= extra.orderRange[1]);
        return extra.orderRange[0] <= Math.round(rate * extra.numUmas) ? regions : new RegionList();
      }
      return regions;
    }
  });
}
function orderOutFilter(rate) {
  return immediate({
    filterEq(regions, one, _0, _1, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be order_rate_outXX_continue==1");
      if (extra.orderRange != null) {
        (0, import_node_assert3.strict)(extra.orderRange[0] <= extra.orderRange[1] && extra.orderRange[1] <= extra.numUmas);
        return Math.round(rate * extra.numUmas) <= extra.orderRange[1] ? regions : new RegionList();
      }
      return regions;
    }
  });
}
var Conditions = Object.freeze({
  accumulatetime: immediate({
    filterGte(regions, t, _0, _1, extra) {
      return [regions, (s) => s.accumulatetime.t >= t];
    }
  }),
  activate_count_all: immediate({
    filterLte(regions, n, _0, _1, extra) {
      return [regions, (s) => s.activateCount.reduce((a, b) => a + b) <= n];
    },
    filterGte(regions, n, _0, _1, extra) {
      return [regions, (s) => s.activateCount.reduce((a, b) => a + b) >= n];
    }
  }),
  activate_count_end_after: immediate({
    filterGte(regions, n, _0, _1, extra) {
      return [regions, (s) => s.activateCount[2] >= n];
    }
  }),
  activate_count_heal: immediate({
    filterGte(regions, n, _0, _1, extra) {
      return [regions, (s) => s.activateCountHeal >= n];
    }
  }),
  activate_count_middle: immediate({
    filterGte(regions, n, _0, _1, extra) {
      return [regions, (s) => s.activateCount[1] >= n];
    }
  }),
  activate_count_start: immediate({
    filterGte(regions, n, _0, _1, extra) {
      return [regions, (s) => s.activateCount[0] >= n];
    }
  }),
  all_corner_random: {
    samplePolicy: AllCornerRandomPolicy,
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be all_corner_random==1");
      const corners = course.corners.map((c) => new Region(c.start, c.start + c.length));
      return regions.rmap((r) => corners.map((c) => r.intersect(c)));
    },
    filterNeq: notSupported,
    filterLt: notSupported,
    filterLte: notSupported,
    filterGt: notSupported,
    filterGte: notSupported
  },
  always: noopImmediate,
  // NB. since skill conditions are processed before any skill activations, stats here are base stats (i.e. greens are not included)
  base_power: valueFilter((_, horse, extra) => horse.power),
  base_speed: valueFilter((_, horse, extra) => horse.speed),
  base_stamina: valueFilter((_, horse, extra) => horse.stamina),
  base_guts: valueFilter((_, horse, extra) => horse.guts),
  base_wiz: valueFilter((_, horse, extra) => horse.wisdom),
  bashin_diff_behind: noopErlangRandom(3, 2),
  bashin_diff_infront: noopErlangRandom(3, 2),
  behind_near_lane_time: noopErlangRandom(3, 2),
  // NB. at least in theory _set1 should have a slightly more early-biased distribution since it's technically easier to activate, but I don't
  // really think it makes much of a difference. Same with blocked_front vs blocked_front_continuetime I suppose.
  behind_near_lane_time_set1: noopErlangRandom(3, 2),
  blocked_all_continuetime: noopErlangRandom(3, 2),
  blocked_front: noopErlangRandom(3, 2),
  blocked_front_continuetime: noopErlangRandom(3, 2),
  blocked_side_continuetime: noopErlangRandom(3, 2),
  change_order_onetime: noopErlangRandom(3, 2),
  change_order_up_end_after: erlangRandom(3, 2, {
    filterGte(regions, _0, course, _1, extra) {
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, 2), course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  change_order_up_finalcorner_after: erlangRandom(3, 2, {
    filterGte(regions, _0, course, _1, extra) {
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.corners), "course corners must be sorted by start");
      if (course.corners.length == 0) {
        return new RegionList();
      }
      const finalCornerStart = course.corners[course.corners.length - 1].start;
      const bounds = new Region(finalCornerStart, course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  change_order_up_middle: erlangRandom(3, 2, {
    filterGte(regions, _0, course, _1, extra) {
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, 1), CourseHelpers.phaseEnd(course.distance, 1));
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  compete_fight_count: uniformRandom({
    filterGt(regions, _0, course, _1, extra) {
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.straights), "course straights must be sorted by start");
      const lastStraight = course.straights[course.straights.length - 1];
      return regions.rmap((r) => r.intersect(lastStraight));
    }
  }),
  corner: immediate({
    filterEq(regions, cornerNum, course, _, extra) {
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.corners), "course corners must be sorted by start");
      if (cornerNum == 0) {
        let lastEnd = 0;
        const nonCorners = course.corners.map((c) => {
          const r = new Region(lastEnd, c.start);
          lastEnd = c.start + c.length;
          return r;
        });
        if (lastEnd != course.distance) {
          nonCorners.push(new Region(lastEnd, course.distance));
        }
        return regions.rmap((r) => nonCorners.map((s) => r.intersect(s)));
      } else if (course.corners.length + cornerNum >= 5) {
        const corners = [];
        for (let cornerIdx = course.corners.length + cornerNum - 5; cornerIdx >= 0; cornerIdx -= 4) {
          const corner = course.corners[cornerIdx];
          corners.push(new Region(corner.start, corner.start + corner.length));
        }
        corners.reverse();
        return regions.rmap((r) => corners.map((c) => r.intersect(c)));
      } else {
        return new RegionList();
      }
    },
    filterNeq(regions, cornerNum, course, _, extra) {
      (0, import_node_assert3.strict)(cornerNum == 0, "only supports corner!=0");
      const corners = course.corners.map((c) => new Region(c.start, c.start + c.length));
      return regions.rmap((r) => corners.map((c) => r.intersect(c)));
    }
  }),
  corner_count: valueFilter((course, _, extra) => course.corners.length),
  // FIXME this shouldn't actually be random, since in cases like corner_random==1@corner_random==2 it should sample
  // only from the first corner and not from the combined regions, so it needs its own sample policy
  // actually, that's slightly annoying to handle since corners come in back-to-back pairs, so their regions will
  // get merged by the union operation.
  // the real way to fix this is to finally allow placing multiple triggers, then each branch of an @ can simply
  // place its own trigger and the problem goes away.
  corner_random: random({
    filterEq(regions, cornerNum, course, _, extra) {
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.corners), "course corners must be sorted by start");
      if ([
        "200331",
        "200332",
        "200333",
        "200341",
        "200342",
        "200343",
        "200351",
        "200352",
        "200353",
        "200971",
        "200972",
        "201041",
        "201042",
        "201111",
        "201112",
        "201181",
        "201182",
        "201251",
        "201252",
        "201321",
        "201322",
        "201391",
        "201392",
        "201461",
        "201462"
      ].indexOf(extra.skillId) > -1) {
        if (cornerNum == 1) {
          const corner = course.corners[Math.max(course.corners.length - 4, 0)];
          const cornerBounds = new Region(corner.start, corner.start + corner.length);
          return regions.rmap((r) => r.intersect(cornerBounds));
        } else {
          return new RegionList();
        }
      }
      if (course.corners.length + cornerNum >= 5) {
        const corner = course.corners[course.corners.length + cornerNum - 5];
        const cornerBounds = new Region(corner.start, corner.start + corner.length);
        return regions.rmap((r) => r.intersect(cornerBounds));
      } else {
        return new RegionList();
      }
    }
  }),
  course_distance: valueFilter((course, _, extra) => course.distance),
  distance_diff_rate: noopImmediate,
  distance_diff_top: noopImmediate,
  distance_diff_top_float: noopImmediate,
  distance_rate: immediate({
    filterLte(regions, rate, course, _, extra) {
      const bounds = new Region(0, course.distance * rate / 100);
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterGte(regions, rate, course, _, extra) {
      const bounds = new Region(course.distance * rate / 100, course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  distance_rate_after_random: random({
    filterEq(regions, rate, course, _, extra) {
      const bounds = new Region(course.distance * rate / 100, course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  distance_type: immediate({
    filterEq(regions, distanceType, course, _, extra) {
      CourseHelpers.assertIsDistanceType(distanceType);
      if (course.distanceType == distanceType) {
        return regions;
      } else {
        return new RegionList();
      }
    },
    filterNeq(regions, distanceType, course, _, extra) {
      CourseHelpers.assertIsDistanceType(distanceType);
      if (course.distanceType != distanceType) {
        return regions;
      } else {
        return new RegionList();
      }
    }
  }),
  down_slope_random: random({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be down_slope_random==1");
      const slopes = course.slopes.filter((s) => s.slope < 0).map((s) => new Region(s.start, s.start + s.length));
      return regions.rmap((r) => slopes.map((s) => r.intersect(s)));
    }
  }),
  grade: valueFilter((_0, _1, extra) => extra.grade),
  ground_condition: valueFilter((_0, _1, extra) => extra.groundCondition),
  ground_type: valueFilter((course, _, extra) => course.surface),
  hp_per: immediate({
    filterLte(regions, hpPer, _0, _1, extra) {
      hpPer /= 100;
      return [regions, (s) => s.hp.hpRatioRemaining() <= hpPer];
    },
    filterGte(regions, hpPer, _0, _1, extra) {
      hpPer /= 100;
      return [regions, (s) => s.hp.hpRatioRemaining() >= hpPer];
    }
  }),
  infront_near_lane_time: noopErlangRandom(3, 2),
  is_activate_other_skill_detail: immediate({
    filterEq(regions, one, _0, _1, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_activate_other_skill_detail==1");
      return [regions, (s) => s.usedSkills.has(extra.skillId)];
    }
  }),
  is_basis_distance: immediate({
    filterEq(regions, flag, course, _, extra) {
      (0, import_node_assert3.strict)(flag == 0 || flag == 1, "must be is_basis_distance==0 or is_basis_distance==1");
      return Math.min(course.distance % 400, 1) != flag ? regions : new RegionList();
    }
  }),
  is_badstart: immediate({
    filterEq(regions, flag, _0, _1, extra) {
      (0, import_node_assert3.strict)(flag == 0 || flag == 1, "must be is_badstart==0 or is_badstart==1");
      const f = flag ? (s) => s.startDelay > 0.08 : (s) => s.startDelay <= 0.08;
      return [regions, f];
    }
  }),
  is_behind_in: noopImmediate,
  is_dirtgrade: immediate({
    filterEq(regions, flag, course, _, extra) {
      (0, import_node_assert3.strict)(flag == 1, "must be is_dirtgrade==1");
      return [10101, 10103, 10104, 10105].indexOf(course.raceTrackId) > -1 ? regions : new RegionList();
    },
    filterNeq(regions, flag, course, _, extra) {
      (0, import_node_assert3.strict)(flag == 1, "must be is_dirtgrade!=1");
      return [10101, 10103, 10104, 10105].indexOf(course.raceTrackId) == -1 ? regions : new RegionList();
    }
  }),
  is_finalcorner: immediate({
    filterEq(regions, flag, course, _, extra) {
      (0, import_node_assert3.strict)(flag == 0 || flag == 1, "must be is_finalcorner==0 or is_finalcorner==1");
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.corners), "course corners must be sorted by start");
      if (course.corners.length == 0) {
        return new RegionList();
      }
      const finalCornerStart = course.corners[course.corners.length - 1].start;
      const bounds = flag ? new Region(finalCornerStart, course.distance) : new Region(0, finalCornerStart);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  is_finalcorner_laterhalf: immediate({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_finalcorner_laterhalf==1");
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.corners), "course corners must be sorted by start");
      if (course.corners.length == 0) {
        return new RegionList();
      }
      const fc = course.corners[course.corners.length - 1];
      const bounds = new Region((fc.start + fc.start + fc.length) / 2, fc.start + fc.length);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  is_finalcorner_random: random({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_finalcorner_random==1");
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.corners), "course corners must be sorted by start");
      if (course.corners.length == 0) {
        return new RegionList();
      }
      const fc = course.corners[course.corners.length - 1];
      const bounds = new Region(fc.start, fc.start + fc.length);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  is_hp_empty_onetime: immediate({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_hp_empty_onetime==1");
      return [regions, (s) => !s.hp.hasRemainingHp()];
    }
  }),
  is_lastspurt: immediate({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_lastspurt==1");
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, 2), course.distance);
      return [regions.rmap((r) => r.intersect(bounds)), (s) => s.isLastSpurt];
    }
  }),
  is_last_straight: immediate({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_last_straight_onetime==1");
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.straights), "course straights must be sorted by start");
      const lastStraight = course.straights[course.straights.length - 1];
      return regions.rmap((r) => r.intersect(lastStraight));
    }
  }),
  is_last_straight_onetime: immediate({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be is_last_straight_onetime==1");
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.straights), "course straights must be sorted by start");
      const lastStraightStart = course.straights[course.straights.length - 1].start;
      const trigger = new Region(lastStraightStart, lastStraightStart + 10);
      return regions.rmap((r) => r.intersect(trigger));
    }
  }),
  is_move_lane: noopErlangRandom(5, 1),
  is_overtake: noopErlangRandom(1, 2),
  is_surrounded: noopErlangRandom(3, 2),
  is_temptation: noopImmediate,
  is_used_skill_id: immediate({
    filterEq(regions, skillId, _0, _1, extra) {
      return [regions, (s) => s.usedSkills.has("" + skillId)];
    }
  }),
  lane_type: noopImmediate,
  lastspurt: immediate({
    filterEq(regions, case_, course, _, extra) {
      let f;
      switch (case_) {
        case 1:
          f = (s) => s.isLastSpurt && s.lastSpurtTransition != -1;
          break;
        case 2:
          f = (s) => s.isLastSpurt && s.lastSpurtTransition == -1;
          break;
        case 3:
          f = (s) => !s.isLastSpurt;
          break;
        default:
          (0, import_node_assert3.strict)(1 <= case_ && case_ <= 3, "lastspurt case must be 1-3");
      }
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, 2), course.distance);
      return [regions.rmap((r) => r.intersect(bounds)), f];
    }
  }),
  motivation: valueFilter((_0, _1, extra) => extra.mood + 3),
  // go from -2 to 2 to 1-5 scale
  near_count: noopErlangRandom(3, 2),
  order: orderFilter((pos, _) => pos),
  order_rate: orderFilter((rate, numUmas) => Math.round(numUmas * (rate / 100))),
  order_rate_in20_continue: orderInFilter(0.2),
  order_rate_in40_continue: orderInFilter(0.4),
  order_rate_in80_continue: orderInFilter(0.8),
  order_rate_out20_continue: orderOutFilter(0.2),
  order_rate_out40_continue: orderOutFilter(0.4),
  order_rate_out50_continue: orderOutFilter(0.5),
  order_rate_out70_continue: orderOutFilter(0.7),
  overtake_target_no_order_up_time: noopErlangRandom(3, 2),
  overtake_target_time: noopErlangRandom(3, 2),
  phase: {
    samplePolicy: ImmediatePolicy,
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const fudge = ["100591", "900591", "110261", "910261", "110191", "910191", "120451", "920451", "101502121"].indexOf(extra.skillId) > -1 ? 10 : 0;
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, phase), CourseHelpers.phaseEnd(course.distance, phase) + fudge);
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterNeq: notSupported,
    filterLt(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      (0, import_node_assert3.strict)(phase > 0, "phase == 0");
      const bounds = new Region(0, CourseHelpers.phaseStart(course.distance, phase));
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterLte(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const bounds = new Region(0, CourseHelpers.phaseEnd(course.distance, phase));
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterGt(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      (0, import_node_assert3.strict)(phase < 3, "phase > 2");
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, phase + 1), course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterGte(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, phase), course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    }
  },
  phase_corner_random: random({
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const phaseStart = CourseHelpers.phaseStart(course.distance, phase);
      const phaseEnd = CourseHelpers.phaseEnd(course.distance, phase);
      const corners = course.corners.filter((c) => c.start >= phaseStart && c.start < phaseEnd || c.start + c.length >= phaseStart && c.start + c.length < phaseEnd).map((c) => new Region(Math.max(c.start, phaseStart), Math.min(c.start + c.length, phaseEnd)));
      return regions.rmap((r) => corners.map((c) => r.intersect(c)));
    }
  }),
  phase_firsthalf_random: random({
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const start = CourseHelpers.phaseStart(course.distance, phase);
      const end = CourseHelpers.phaseEnd(course.distance, phase);
      const bounds = new Region(start, start + (end - start) / 2);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  phase_firstquarter: immediate({
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const start = CourseHelpers.phaseStart(course.distance, phase);
      const end = CourseHelpers.phaseEnd(course.distance, phase);
      const bounds = new Region(start, start + (end - start) / 4);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  phase_firstquarter_random: random({
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const start = CourseHelpers.phaseStart(course.distance, phase);
      const end = CourseHelpers.phaseEnd(course.distance, phase);
      const bounds = new Region(start, start + (end - start) / 4);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  phase_laterhalf_random: random({
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const start = CourseHelpers.phaseStart(course.distance, phase);
      const end = CourseHelpers.phaseEnd(course.distance, phase);
      const bounds = new Region((start + end) / 2, end);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  phase_random: random({
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, phase), CourseHelpers.phaseEnd(course.distance, phase));
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  phase_straight_random: {
    samplePolicy: StraightRandomPolicy,
    filterEq(regions, phase, course, _, extra) {
      CourseHelpers.assertIsPhase(phase);
      const phaseBounds = new Region(CourseHelpers.phaseStart(course.distance, phase), CourseHelpers.phaseEnd(course.distance, phase));
      return regions.rmap((r) => course.straights.map((s) => r.intersect(s))).rmap((r) => r.intersect(phaseBounds));
    },
    filterNeq: notSupported,
    filterLt: notSupported,
    filterLte: notSupported,
    filterGt: notSupported,
    filterGte: notSupported
  },
  popularity: noopImmediate,
  post_number: function() {
    function gateBlock(s, numUmas) {
      const gateNumber = s.gateRoll % numUmas;
      if (gateNumber < 9)
        return gateNumber;
      else
        return 1 + (24 - gateNumber) % 8;
    }
    return immediate({
      filterEq(regions, post, _0, _1, extra) {
        return [regions, (s) => gateBlock(s, extra.numUmas || 9) == post];
      },
      filterLte(regions, post, _0, _1, extra) {
        return [regions, (s) => gateBlock(s, extra.numUmas || 9) <= post];
      },
      filterGte(regions, post, _0, _1, extra) {
        return [regions, (s) => gateBlock(s, extra.numUmas || 9) >= post];
      }
    });
  }(),
  random_lot: immediate({
    filterEq(regions, lot, _0, _1, extra) {
      return [regions, (s) => s.randomLot < lot];
    }
  }),
  remain_distance: immediate({
    filterEq(regions, remain, course, _, extra) {
      const bounds = new Region(course.distance - remain, course.distance - remain + 1);
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterLte(regions, remain, course, _, extra) {
      const bounds = new Region(course.distance - remain, course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterGte(regions, remain, course, _, extra) {
      const bounds = new Region(0, course.distance - remain);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  rotation: valueFilter((course, _, extra) => course.turn),
  running_style: immediate({
    filterEq(regions, strategy, _, horse, extra) {
      StrategyHelpers.assertIsStrategy(strategy);
      if (StrategyHelpers.strategyMatches(horse.strategy, strategy)) {
        return regions;
      } else {
        return new RegionList();
      }
    }
  }),
  running_style_count_same: noopImmediate,
  running_style_count_same_rate: noopImmediate,
  // these are used exclusively on debuffs, in which case they only get added to /us/ from the "other" perspective, in which case
  // we actually want them to active if /our/ strategy matches the condition
  // NB. this seems kind of questionable in general. perhaps a perspective member should be added to RaceParameters.
  // also, abusing valueFilter like this only works because these conditions are used like running_style_count_nige_otherself>=1
  running_style_count_nige_otherself: valueFilter(
    (_, horse, extra) => +StrategyHelpers.strategyMatches(horse.strategy, 1 /* Nige */)
  ),
  running_style_count_senko_otherself: valueFilter(
    (_, horse, extra) => +StrategyHelpers.strategyMatches(horse.strategy, 2 /* Senkou */)
  ),
  running_style_count_sashi_otherself: valueFilter(
    (_, horse, extra) => +StrategyHelpers.strategyMatches(horse.strategy, 3 /* Sasi */)
  ),
  running_style_count_oikomi_otherself: valueFilter(
    (_, horse, extra) => +StrategyHelpers.strategyMatches(horse.strategy, 4 /* Oikomi */)
  ),
  running_style_equal_popularity_one: noopImmediate,
  running_style_temptation_count_nige: noopSectionRandom(2, 9),
  running_style_temptation_count_senko: noopSectionRandom(2, 9),
  running_style_temptation_count_sashi: noopSectionRandom(2, 9),
  running_style_temptation_count_oikomi: noopSectionRandom(2, 9),
  same_skill_horse_count: noopImmediate,
  season: valueFilter((_0, _1, extra) => extra.season),
  slope: immediate({
    filterEq(regions, slopeType, course, _, extra) {
      (0, import_node_assert3.strict)(slopeType == 0 || slopeType == 1 || slopeType == 2, "slopeType");
      (0, import_node_assert3.strict)(CourseHelpers.isSortedByStart(course.slopes), "course slopes must be sorted by slope start");
      let lastEnd = 0;
      const slopes = course.slopes.filter((s) => slopeType != 2 && s.slope > 0 || slopeType != 1 && s.slope < 0);
      const slopeR = slopeType == 0 ? slopes.map((s) => {
        const r = new Region(lastEnd, s.start);
        lastEnd = s.start + s.length;
        return r;
      }) : slopes.map((s) => new Region(s.start, s.start + s.length));
      if (slopeType == 0 && lastEnd != course.distance) {
        slopeR.push(new Region(lastEnd, course.distance));
      }
      return regions.rmap((r) => slopeR.map((s) => r.intersect(s)));
    }
  }),
  straight_front_type: immediate({
    filterEq(regions, frontType, course, _, extra) {
      (0, import_node_assert3.strict)(frontType == 1 || frontType == 2, "frontType");
      const straights = course.straights.filter((s) => s.frontType == frontType);
      return regions.rmap((r) => straights.map((s) => r.intersect(s)));
    }
  }),
  straight_random: {
    samplePolicy: StraightRandomPolicy,
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be straight_random==1");
      return regions.rmap((r) => course.straights.map((s) => r.intersect(s)));
    },
    filterNeq: notSupported,
    filterLt: notSupported,
    filterLte: notSupported,
    filterGt: notSupported,
    filterGte: notSupported
  },
  temptation_count: noopImmediate,
  temptation_count_behind: noopSectionRandom(2, 9),
  temptation_count_infront: noopSectionRandom(2, 9),
  time: valueFilter((_0, _1, extra) => extra.time),
  track_id: valueFilter((course, _, extra) => course.raceTrackId),
  up_slope_random: random({
    filterEq(regions, one, course, _, extra) {
      (0, import_node_assert3.strict)(one == 1, "must be up_slope_random==1");
      const slopes = course.slopes.filter((s) => s.slope > 0).map((s) => new Region(s.start, s.start + s.length));
      return regions.rmap((r) => slopes.map((s) => r.intersect(s)));
    }
  }),
  visiblehorse: noopImmediate,
  weather: valueFilter((_0, _1, extra) => extra.weather)
});

// ../uma-tools/uma-skill-tools/ConditionParser.ts
var ParseError = class extends Error {
  constructor(msg) {
    super(msg);
  }
};
function isId(c) {
  return "a".charCodeAt(0) <= c && c <= "z".charCodeAt(0) || "0".charCodeAt(0) <= c && c <= "9".charCodeAt(0) || c == "_".charCodeAt(0);
}
var IntValue = class {
  constructor(value) {
    this.lbp = 0;
    this.value = value;
  }
  led(state, left) {
    throw new ParseError("unexpected integer literal");
  }
  nud(state) {
    return { type: 0 /* Int */, value: this.value };
  }
};
function getParser(conditions = Conditions, operators = {
  and: AndOperator,
  // this is really stupid
  or: OrOperator,
  eq: EqOperator,
  neq: NeqOperator,
  lt: LtOperator,
  lte: LteOperator,
  gt: GtOperator,
  gte: GteOperator
}) {
  const Eof = Object.freeze({
    lbp: 0,
    led: (state, left) => {
      throw new ParseError("unexpected eof");
    },
    nud: (state) => {
      throw new ParseError("unexpected eof");
    }
  });
  class Identifier {
    constructor(value) {
      this.lbp = 0;
      this.value = value;
    }
    led(state, left) {
      throw new ParseError("unexpected identifier");
    }
    nud(state) {
      return { type: 1 /* Cond */, cond: conditions[this.value] };
    }
  }
  class CmpOp {
    constructor(lbp, opclass) {
      this.lbp = lbp;
      this.opclass = opclass;
    }
    led(state, left) {
      if (left.type != 1 /* Cond */)
        throw new ParseError("expected condition on left hand side of comparison");
      const right = expression(state, this.lbp);
      if (right.type != 0 /* Int */)
        throw new ParseError("expected number on right hand side of comparison");
      return { type: 2 /* Op */, op: new this.opclass(left.cond, right.value) };
    }
    nud(state) {
      throw new ParseError("expected expression");
    }
  }
  class LogicalOp {
    constructor(lbp, opclass) {
      this.lbp = lbp;
      this.opclass = opclass;
    }
    led(state, left) {
      if (left.type != 2 /* Op */)
        throw new ParseError("expected comparison on left hand side of operator");
      const right = expression(state, this.lbp);
      if (right.type != 2 /* Op */)
        throw new ParseError("expected comparison on right hand side of operator");
      return { type: 2 /* Op */, op: new this.opclass(left.op, right.op) };
    }
    nud(state) {
      throw new ParseError("expected expression");
    }
  }
  const OperatorEq = Object.freeze(new CmpOp(30, operators.eq));
  const OperatorNeq = Object.freeze(new CmpOp(30, operators.neq));
  const OperatorLt = Object.freeze(new CmpOp(30, operators.lt));
  const OperatorLte = Object.freeze(new CmpOp(30, operators.lte));
  const OperatorGt = Object.freeze(new CmpOp(30, operators.gt));
  const OperatorGte = Object.freeze(new CmpOp(30, operators.gte));
  const OperatorAnd = Object.freeze(new LogicalOp(20, operators.and));
  const OperatorOr = Object.freeze(new LogicalOp(10, operators.or));
  function* tokenize(s) {
    var i = 0;
    while (i < s.length) {
      var c = s.charCodeAt(i);
      if ("0".charCodeAt(0) <= c && c <= "9".charCodeAt(0)) {
        var n = 0;
        while ("0".charCodeAt(0) <= c && c <= "9".charCodeAt(0)) {
          n *= 10;
          n += c - "0".charCodeAt(0);
          c = s.charCodeAt(++i);
        }
        yield new IntValue(n);
      } else if (isId(c)) {
        var idstart = i;
        while (isId(c)) {
          c = s.charCodeAt(++i);
        }
        yield new Identifier(s.slice(idstart, i));
      } else
        switch (s[i]) {
          case "=":
            if (s[++i] != "=")
              throw new ParseError("expected =");
            ++i;
            yield OperatorEq;
            break;
          case "!":
            if (s[++i] != "=")
              throw new ParseError("expected =");
            ++i;
            yield OperatorNeq;
            break;
          case "<":
            if (s[++i] == "=") {
              ++i;
              yield OperatorLte;
            } else {
              yield OperatorLt;
            }
            break;
          case ">":
            if (s[++i] == "=") {
              ++i;
              yield OperatorGte;
            } else {
              yield OperatorGt;
            }
            break;
          case "@":
            yield OperatorOr;
            ++i;
            break;
          case "&":
            yield OperatorAnd;
            ++i;
            break;
          default:
            throw new ParseError("invalid character");
        }
    }
    return Eof;
  }
  function parseAny(tokens) {
    const state = { current: Eof, next: tokens.next().value, tokens };
    return expression(state, 0);
  }
  function parse(tokens) {
    const node = parseAny(tokens);
    if (node.type != 2 /* Op */) {
      throw new ParseError("expected comparison or operator");
    }
    return node.op;
  }
  function expression(state, rbp) {
    state.current = state.next;
    state.next = state.tokens.next().value;
    var left = state.current.nud(state);
    while (rbp < state.next.lbp) {
      state.current = state.next;
      state.next = state.tokens.next().value;
      left = state.current.led(state, left);
    }
    return left;
  }
  return { tokenize, parse, parseAny };
}

// ../uma-tools/uma-skill-tools/RaceSolver.ts
var import_node_assert4 = require("node:assert");
if (false)
  global.CC_GLOBAL = false;
var Speed;
((Speed2) => {
  Speed2.StrategyPhaseCoefficient = Object.freeze([
    [],
    // strategies start numbered at 1
    [1, 0.98, 0.962],
    [0.978, 0.991, 0.975],
    [0.938, 0.998, 0.994],
    [0.931, 1, 1],
    [1.063, 0.962, 0.95]
  ].map((a) => Object.freeze(a)));
  Speed2.DistanceProficiencyModifier = Object.freeze([1.05, 1, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1]);
})(Speed || (Speed = {}));
function baseSpeed(course) {
  return 20 - (course.distance - 2e3) / 1e3;
}
function baseTargetSpeed(horse, course, phase) {
  return baseSpeed(course) * Speed.StrategyPhaseCoefficient[horse.strategy][phase] + +(phase == 2) * Math.sqrt(500 * horse.speed) * Speed.DistanceProficiencyModifier[horse.distanceAptitude] * 2e-3;
}
function lastSpurtSpeed(horse, course) {
  let v = (baseTargetSpeed(horse, course, 2) + 0.01 * baseSpeed(course)) * 1.05 + Math.sqrt(500 * horse.speed) * Speed.DistanceProficiencyModifier[horse.distanceAptitude] * 2e-3;
  if (true) {
    v += Math.pow(450 * horse.guts, 0.597) * 1e-4;
  }
  return v;
}
var Acceleration;
((Acceleration2) => {
  Acceleration2.StrategyPhaseCoefficient = Object.freeze([
    [],
    [1, 1, 0.996],
    [0.985, 1, 0.996],
    [0.975, 1, 1],
    [0.945, 1, 0.997],
    [1.17, 0.94, 0.956]
  ].map((a) => Object.freeze(a)));
  Acceleration2.GroundTypeProficiencyModifier = Object.freeze([1.05, 1, 0.9, 0.8, 0.7, 0.5, 0.3, 0.1]);
  Acceleration2.DistanceProficiencyModifier = Object.freeze([1, 1, 1, 1, 1, 0.6, 0.5, 0.4]);
})(Acceleration || (Acceleration = {}));
var BaseAccel = 6e-4;
var UphillBaseAccel = 4e-4;
function baseAccel(baseAccel2, horse, phase) {
  return baseAccel2 * Math.sqrt(500 * horse.power) * Acceleration.StrategyPhaseCoefficient[horse.strategy][phase] * Acceleration.GroundTypeProficiencyModifier[horse.surfaceAptitude] * Acceleration.DistanceProficiencyModifier[horse.distanceAptitude];
}
var PhaseDeceleration = [-1.2, -0.8, -1];
var PositionKeep;
((PositionKeep2) => {
  PositionKeep2.BaseMinimumThreshold = Object.freeze([0, 0, 3, 6.5, 7.5]);
  PositionKeep2.BaseMaximumThreshold = Object.freeze([0, 0, 5, 7, 8]);
  function courseFactor(distance) {
    return 8e-4 * (distance - 1e3) + 1;
  }
  PositionKeep2.courseFactor = courseFactor;
  function minThreshold(strategy, distance) {
    return PositionKeep2.BaseMinimumThreshold[strategy] * (strategy == 2 /* Senkou */ ? 1 : courseFactor(distance));
  }
  PositionKeep2.minThreshold = minThreshold;
  function maxThreshold(strategy, distance) {
    return PositionKeep2.BaseMaximumThreshold[strategy] * courseFactor(distance);
  }
  PositionKeep2.maxThreshold = maxThreshold;
})(PositionKeep || (PositionKeep = {}));
var Timer = class {
  constructor(t) {
    this.t = t;
  }
};
var CompensatedAccumulator = class {
  constructor(acc, err = 0) {
    this.acc = acc;
    this.err = err;
  }
  add(n) {
    const t = this.acc + n;
    if (Math.abs(this.acc) >= Math.abs(n)) {
      this.err += this.acc - t + n;
    } else {
      this.err += n - t + this.acc;
    }
    this.acc = t;
  }
};
var SkillType = /* @__PURE__ */ ((SkillType2) => {
  SkillType2[SkillType2["SpeedUp"] = 1] = "SpeedUp";
  SkillType2[SkillType2["StaminaUp"] = 2] = "StaminaUp";
  SkillType2[SkillType2["PowerUp"] = 3] = "PowerUp";
  SkillType2[SkillType2["GutsUp"] = 4] = "GutsUp";
  SkillType2[SkillType2["WisdomUp"] = 5] = "WisdomUp";
  SkillType2[SkillType2["Recovery"] = 9] = "Recovery";
  SkillType2[SkillType2["MultiplyStartDelay"] = 10] = "MultiplyStartDelay";
  SkillType2[SkillType2["SetStartDelay"] = 14] = "SetStartDelay";
  SkillType2[SkillType2["CurrentSpeed"] = 21] = "CurrentSpeed";
  SkillType2[SkillType2["CurrentSpeedWithNaturalDeceleration"] = 22] = "CurrentSpeedWithNaturalDeceleration";
  SkillType2[SkillType2["TargetSpeed"] = 27] = "TargetSpeed";
  SkillType2[SkillType2["Accel"] = 31] = "Accel";
  SkillType2[SkillType2["ActivateRandomGold"] = 37] = "ActivateRandomGold";
  SkillType2[SkillType2["ExtendEvolvedDuration"] = 42] = "ExtendEvolvedDuration";
  return SkillType2;
})(SkillType || {});
function noop2(x) {
}
var RaceSolver = class {
  constructor(params) {
    this.horse = Object.assign({}, params.horse);
    this.course = params.course;
    this.hp = params.hp;
    this.pacer = params.pacer || null;
    this.rng = params.rng;
    this.pendingSkills = params.skills.slice();
    this.pendingRemoval = /* @__PURE__ */ new Set();
    this.usedSkills = /* @__PURE__ */ new Set();
    this.gorosiRng = new Rule30CARng(this.rng.int32());
    this.paceEffectRng = new Rule30CARng(this.rng.int32());
    this.timers = [];
    this.accumulatetime = this.getNewTimer();
    this.gateRoll = this.rng.uniform(12252240);
    this.randomLot = this.rng.uniform(100);
    this.phase = 0;
    this.nextPhaseTransition = CourseHelpers.phaseStart(this.course.distance, 1);
    this.activeTargetSpeedSkills = [];
    this.activeCurrentSpeedSkills = [];
    this.activeAccelSkills = [];
    this.activateCount = [0, 0, 0];
    this.activateCountHeal = 0;
    this.onSkillActivate = params.onSkillActivate || noop2;
    this.onSkillDeactivate = params.onSkillDeactivate || noop2;
    this.sectionLength = this.course.distance / 24;
    this.isPaceDown = false;
    this.posKeepMinThreshold = PositionKeep.minThreshold(this.horse.strategy, this.course.distance);
    this.posKeepMaxThreshold = PositionKeep.maxThreshold(this.horse.strategy, this.course.distance);
    this.posKeepCooldown = this.getNewTimer();
    this.posKeepEnd = this.sectionLength * 5;
    this.posKeepSpeedCoef = 1;
    if (StrategyHelpers.strategyMatches(this.horse.strategy, 1 /* Nige */) || this.pacer == null) {
      this.updatePositionKeep = noop2;
    } else {
      this.updatePositionKeep = this.updatePositionKeepNonNige;
    }
    this.modifiers = {
      targetSpeed: new CompensatedAccumulator(0),
      currentSpeed: new CompensatedAccumulator(0),
      accel: new CompensatedAccumulator(0),
      oneFrameAccel: 0,
      specialSkillDurationScaling: 1
    };
    this.initHills();
    this.startDelay = 0.1 * this.rng.random();
    if (this.pacer) {
      this.pacer.startDelay = 0;
    }
    this.pos = 0;
    this.accel = 0;
    this.currentSpeed = 3;
    this.targetSpeed = 0.85 * baseSpeed(this.course);
    this.processSkillActivations();
    this.minSpeed = 0.85 * baseSpeed(this.course) + Math.sqrt(200 * this.horse.guts) * 1e-3;
    this.startDash = true;
    this.modifiers.accel.add(24);
    this.baseTargetSpeed = [0, 1, 2].map((phase) => baseTargetSpeed(this.horse, this.course, phase));
    this.lastSpurtSpeed = lastSpurtSpeed(this.horse, this.course);
    this.lastSpurtTransition = -1;
    this.sectionModifier = Array.from({ length: 24 }, () => {
      const max = this.horse.wisdom / 5500 * Math.log10(this.horse.wisdom * 0.1);
      const factor = (max - 0.65 + this.rng.random() * 0.65) / 100;
      return baseSpeed(this.course) * factor;
    });
    this.sectionModifier.push(0);
    this.hp.init(this.horse);
    this.baseAccel = [0, 1, 2, 0, 1, 2].map((phase, i) => baseAccel(i > 2 ? UphillBaseAccel : BaseAccel, this.horse, phase));
  }
  initHills() {
    (0, import_node_assert4.strict)(CourseHelpers.isSortedByStart(this.course.slopes), "slopes must be sorted by start location");
    this.nHills = this.course.slopes.length;
    this.hillStart = this.course.slopes.map((s) => s.start).reverse();
    this.hillEnd = this.course.slopes.map((s) => s.start + s.length).reverse();
    this.hillIdx = -1;
    if (this.hillStart.length > 0 && this.hillStart[this.hillStart.length - 1] == 0) {
      if (this.course.slopes[0].slope > 0) {
        this.hillIdx = 0;
      } else {
        this.hillEnd.pop();
      }
      this.hillStart.pop();
    }
  }
  getNewTimer(t = 0) {
    const tm = new Timer(t);
    this.timers.push(tm);
    return tm;
  }
  getMaxSpeed() {
    if (this.startDash) {
      return Math.min(this.targetSpeed, 0.85 * baseSpeed(this.course));
    } else if (this.currentSpeed + this.modifiers.oneFrameAccel > this.targetSpeed) {
      return 9999;
    } else {
      return this.targetSpeed;
    }
  }
  step(dt) {
    if (this.accumulatetime.t < this.startDelay) {
      const partialFrame = this.startDelay - this.accumulatetime.t;
      if (partialFrame < dt) {
        this.timers.forEach((tm) => tm.t += partialFrame);
        dt -= partialFrame;
      } else {
        this.timers.forEach((tm) => tm.t += dt);
        return;
      }
    }
    if (this.pos < this.posKeepEnd && this.pacer != null) {
      this.pacer.step(dt);
    }
    const halfv = Math.min(this.currentSpeed + 0.5 * dt * this.accel, this.getMaxSpeed());
    const displacement = halfv + this.modifiers.currentSpeed.acc + this.modifiers.currentSpeed.err;
    this.pos += displacement * dt;
    this.hp.tick(this, dt);
    this.timers.forEach((tm) => tm.t += dt);
    this.updateHills();
    this.updatePhase();
    this.processSkillActivations();
    this.updatePositionKeep();
    this.updateLastSpurtState();
    this.updateTargetSpeed();
    this.applyForces();
    this.currentSpeed = Math.min(halfv + 0.5 * dt * this.accel + this.modifiers.oneFrameAccel, this.getMaxSpeed());
    if (!this.startDash && this.currentSpeed < this.minSpeed) {
      this.currentSpeed = this.minSpeed;
    } else if (this.startDash && this.currentSpeed >= 0.85 * baseSpeed(this.course)) {
      this.startDash = false;
      this.modifiers.accel.add(-24);
    }
    this.modifiers.oneFrameAccel = 0;
  }
  updatePositionKeepNonNige() {
    if (this.pos >= this.posKeepEnd) {
      this.isPaceDown = false;
      this.posKeepSpeedCoef = 1;
      this.updatePositionKeep = noop2;
    } else if (this.isPaceDown) {
      if (this.pacer.pos - this.pos > this.posKeepEffectExitDistance || this.pos - this.posKeepEffectStart > this.sectionLength || this.activeTargetSpeedSkills.length > 0 || this.activeCurrentSpeedSkills.length > 0) {
        this.isPaceDown = false;
        this.posKeepCooldown.t = -3;
        this.posKeepSpeedCoef = 1;
      }
    } else if (this.pacer.pos - this.pos < this.posKeepMinThreshold && this.activeTargetSpeedSkills.length == 0 && this.activeCurrentSpeedSkills.length == 0 && this.posKeepCooldown.t >= 0) {
      this.isPaceDown = true;
      this.posKeepEffectStart = this.pos;
      const min = this.posKeepMinThreshold;
      const max = this.phase == 1 ? min + 0.5 * (this.posKeepMaxThreshold - min) : this.posKeepMaxThreshold;
      this.posKeepEffectExitDistance = min + this.paceEffectRng.random() * (max - min);
      this.posKeepSpeedCoef = this.phase == 1 ? 0.945 : 0.915;
    }
  }
  updateLastSpurtState() {
    if (this.isLastSpurt || this.phase < 2)
      return;
    if (this.lastSpurtTransition == -1) {
      const v = this.hp.getLastSpurtPair(this, this.lastSpurtSpeed, this.baseTargetSpeed[2]);
      this.lastSpurtTransition = v[0];
      this.lastSpurtSpeed = v[1];
    }
    if (this.pos >= this.lastSpurtTransition) {
      this.isLastSpurt = true;
    }
  }
  updateTargetSpeed() {
    if (!this.hp.hasRemainingHp()) {
      this.targetSpeed = this.minSpeed;
    } else if (this.isLastSpurt) {
      this.targetSpeed = this.lastSpurtSpeed;
    } else {
      this.targetSpeed = this.baseTargetSpeed[this.phase] * this.posKeepSpeedCoef;
    }
    this.targetSpeed += this.sectionModifier[Math.floor(this.pos / this.sectionLength)];
    this.targetSpeed += this.modifiers.targetSpeed.acc + this.modifiers.targetSpeed.err;
    if (this.hillIdx != -1) {
      this.targetSpeed -= this.course.slopes[this.hillIdx].slope / 1e4 * 200 / this.horse.power;
      this.targetSpeed = Math.max(this.targetSpeed, this.minSpeed);
    }
  }
  applyForces() {
    if (!this.hp.hasRemainingHp()) {
      this.accel = -1.2;
      return;
    }
    if (this.currentSpeed > this.targetSpeed) {
      this.accel = this.isPaceDown ? -0.5 : PhaseDeceleration[this.phase];
      return;
    }
    this.accel = this.baseAccel[+(this.hillIdx != -1) * 3 + this.phase];
    this.accel += this.modifiers.accel.acc + this.modifiers.accel.err;
  }
  updateHills() {
    if (this.hillIdx == -1 && this.hillStart.length > 0 && this.pos >= this.hillStart[this.hillStart.length - 1]) {
      if (this.course.slopes[this.nHills - this.hillStart.length].slope > 0) {
        this.hillIdx = this.nHills - this.hillStart.length;
      } else {
        this.hillEnd.pop();
      }
      this.hillStart.pop();
    } else if (this.hillIdx != -1 && this.hillEnd.length > 0 && this.pos > this.hillEnd[this.hillEnd.length - 1]) {
      this.hillIdx = -1;
      this.hillEnd.pop();
    }
  }
  updatePhase() {
    if (this.pos >= this.nextPhaseTransition && this.phase < 2) {
      ++this.phase;
      this.nextPhaseTransition = CourseHelpers.phaseStart(this.course.distance, this.phase + 1);
    }
  }
  processSkillActivations() {
    for (let i = this.activeTargetSpeedSkills.length; --i >= 0; ) {
      const s = this.activeTargetSpeedSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeTargetSpeedSkills.splice(i, 1);
        this.modifiers.targetSpeed.add(-s.modifier);
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.activeCurrentSpeedSkills.length; --i >= 0; ) {
      const s = this.activeCurrentSpeedSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeCurrentSpeedSkills.splice(i, 1);
        this.modifiers.currentSpeed.add(-s.modifier);
        if (s.naturalDeceleration) {
          this.modifiers.oneFrameAccel += s.modifier;
        }
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.activeAccelSkills.length; --i >= 0; ) {
      const s = this.activeAccelSkills[i];
      if (s.durationTimer.t >= 0) {
        this.activeAccelSkills.splice(i, 1);
        this.modifiers.accel.add(-s.modifier);
        this.onSkillDeactivate(this, s.skillId, s.perspective);
      }
    }
    for (let i = this.pendingSkills.length; --i >= 0; ) {
      const s = this.pendingSkills[i];
      if (this.pos >= s.trigger.end || this.pendingRemoval.has(s.skillId)) {
        this.pendingSkills.splice(i, 1);
        this.pendingRemoval.delete(s.skillId);
      } else if (this.pos >= s.trigger.start && s.extraCondition(this)) {
        this.activateSkill(s);
        this.pendingSkills.splice(i, 1);
      }
    }
  }
  activateSkill(s) {
    s.effects.sort((a, b) => +(a.type == 42) - +(b.type == 42)).forEach((ef) => {
      const scaledDuration = ef.baseDuration * (this.course.distance / 1e3) * (s.rarity == 6 /* Evolution */ ? this.modifiers.specialSkillDurationScaling : 1);
      switch (ef.type) {
        case 1 /* SpeedUp */:
          this.horse.speed = Math.max(this.horse.speed + ef.modifier, 1);
          break;
        case 2 /* StaminaUp */:
          this.horse.stamina = Math.max(this.horse.stamina + ef.modifier, 1);
          this.horse.rawStamina = Math.max(this.horse.rawStamina + ef.modifier, 1);
          break;
        case 3 /* PowerUp */:
          this.horse.power = Math.max(this.horse.power + ef.modifier, 1);
          break;
        case 4 /* GutsUp */:
          this.horse.guts = Math.max(this.horse.guts + ef.modifier, 1);
          break;
        case 5 /* WisdomUp */:
          this.horse.wisdom = Math.max(this.horse.wisdom + ef.modifier, 1);
          break;
        case 10 /* MultiplyStartDelay */:
          this.startDelay *= ef.modifier;
          break;
        case 14 /* SetStartDelay */:
          this.startDelay = ef.modifier;
          break;
        case 27 /* TargetSpeed */:
          this.modifiers.targetSpeed.add(ef.modifier);
          this.activeTargetSpeedSkills.push({ skillId: s.skillId, perspective: s.perspective, durationTimer: this.getNewTimer(-scaledDuration), modifier: ef.modifier });
          break;
        case 31 /* Accel */:
          this.modifiers.accel.add(ef.modifier);
          this.activeAccelSkills.push({ skillId: s.skillId, perspective: s.perspective, durationTimer: this.getNewTimer(-scaledDuration), modifier: ef.modifier });
          break;
        case 21 /* CurrentSpeed */:
        case 22 /* CurrentSpeedWithNaturalDeceleration */:
          this.modifiers.currentSpeed.add(ef.modifier);
          this.activeCurrentSpeedSkills.push({
            skillId: s.skillId,
            perspective: s.perspective,
            durationTimer: this.getNewTimer(-scaledDuration),
            modifier: ef.modifier,
            naturalDeceleration: ef.type == 22 /* CurrentSpeedWithNaturalDeceleration */
          });
          break;
        case 9 /* Recovery */:
          ++this.activateCountHeal;
          this.hp.recover(ef.modifier);
          if (this.phase >= 2 && !this.isLastSpurt) {
            this.updateLastSpurtState();
          }
          break;
        case 37 /* ActivateRandomGold */:
          this.doActivateRandomGold(ef.modifier);
          break;
        case 42 /* ExtendEvolvedDuration */:
          this.modifiers.specialSkillDurationScaling = ef.modifier;
          break;
      }
    });
    ++this.activateCount[this.phase];
    this.usedSkills.add(s.skillId);
    this.onSkillActivate(this, s.skillId, s.perspective);
  }
  doActivateRandomGold(ngolds) {
    const goldIndices = this.pendingSkills.reduce((acc, skill, i) => {
      if ((skill.rarity == 2 /* Gold */ || skill.rarity == 6 /* Evolution */) && skill.effects.every((ef) => ef.type > 5 /* WisdomUp */))
        acc.push(i);
      return acc;
    }, []);
    for (let i = goldIndices.length; --i >= 0; ) {
      const j = this.gorosiRng.uniform(i + 1);
      [goldIndices[i], goldIndices[j]] = [goldIndices[j], goldIndices[i]];
    }
    for (let i = 0; i < Math.min(ngolds, goldIndices.length); ++i) {
      const s = this.pendingSkills[goldIndices[i]];
      this.activateSkill(s);
      this.pendingRemoval.add(s.skillId);
    }
  }
  // deactivate any skills that haven't finished their durations yet (intended to be called at the end of a simulation, when a skill
  // might have activated towards the end of the race and the race finished before the skill's duration)
  cleanup() {
    const callDeactivateHook = (s) => {
      this.onSkillDeactivate(this, s.skillId, s.perspective);
    };
    this.activeTargetSpeedSkills.forEach(callDeactivateHook);
    this.activeCurrentSpeedSkills.forEach(callDeactivateHook);
    this.activeAccelSkills.forEach(callDeactivateHook);
  }
};

// ../uma-tools/uma-skill-tools/HpPolicy.ts
var NoopHpPolicy = {
  init(_) {
  },
  tick(_0, _1) {
  },
  hasRemainingHp() {
    return true;
  },
  hpRatioRemaining() {
    return 1;
  },
  recover(_) {
  },
  getLastSpurtPair(_0, maxSpeed, _1) {
    return [-1, maxSpeed];
  }
};
var HpStrategyCoefficient = Object.freeze([0, 0.95, 0.89, 1, 0.995, 0.86]);
var HpConsumptionGroundModifier = Object.freeze([
  [],
  [0, 1, 1, 1.02, 1.02],
  [0, 1, 1, 1.01, 1.02]
].map((o) => Object.freeze(o)));
var GameHpPolicy = class {
  constructor(course, ground, rng) {
    this.distance = course.distance;
    this.baseSpeed = 20 - (course.distance - 2e3) / 1e3;
    this.groundModifier = HpConsumptionGroundModifier[course.surface][ground];
    this.rng = rng;
    this.maxHp = 1;
    this.hp = 1;
  }
  init(horse) {
    this.maxHp = 0.8 * HpStrategyCoefficient[horse.strategy] * horse.stamina + this.distance;
    this.hp = this.maxHp;
    this.gutsModifier = 1 + 200 / Math.sqrt(600 * horse.guts);
    this.subparAcceptChance = Math.round((15 + 0.05 * horse.wisdom) * 1e3);
  }
  getStatusModifier(state) {
    let modifier = 1;
    if (state.isPaceDown) {
      modifier *= 0.6;
    }
    return modifier;
  }
  hpPerSecond(state, velocity) {
    const gutsModifier = state.phase >= 2 ? this.gutsModifier : 1;
    return 20 * Math.pow(velocity - this.baseSpeed + 12, 2) / 144 * this.getStatusModifier(state) * this.groundModifier * gutsModifier;
  }
  tick(state, dt) {
    this.hp -= this.hpPerSecond(state, state.currentSpeed) * dt;
  }
  hasRemainingHp() {
    return this.hp > 0;
  }
  hpRatioRemaining() {
    return Math.max(0, this.hp / this.maxHp);
  }
  recover(modifier) {
    this.hp = Math.min(this.maxHp, this.hp + this.maxHp * modifier);
  }
  getLastSpurtPair(state, maxSpeed, baseTargetSpeed2) {
    const maxDist = this.distance - CourseHelpers.phaseStart(this.distance, 2);
    const s = (maxDist - 60) / maxSpeed;
    const lastleg = { phase: 2, isPaceDown: false };
    if (this.hp >= this.hpPerSecond(lastleg, maxSpeed) * s) {
      return [-1, maxSpeed];
    }
    const candidates = [];
    const remainDistance = this.distance - 60 - state.pos;
    const statusModifier = this.getStatusModifier(lastleg);
    for (let speed = maxSpeed - 0.1; speed >= baseTargetSpeed2; speed -= 0.1) {
      const spurtDuration = Math.min(
        remainDistance / speed,
        Math.max(
          0,
          (baseTargetSpeed2 * this.hp - this.hpPerSecond(lastleg, baseTargetSpeed2) * remainDistance) / (baseTargetSpeed2 * this.hpPerSecond(lastleg, speed) - this.hpPerSecond(lastleg, baseTargetSpeed2) * speed)
        )
      );
      const spurtDistance = spurtDuration * speed;
      candidates.push([this.distance - spurtDistance, speed]);
    }
    candidates.sort((a, b) => (a[0] - state.pos) / baseTargetSpeed2 + (this.distance - a[0]) / a[1] - ((b[0] - state.pos) / baseTargetSpeed2 + (this.distance - b[0]) / b[1]));
    for (let i = 0; i < candidates.length; ++i) {
      if (this.rng.uniform(1e5) <= this.subparAcceptChance) {
        return candidates[i];
      }
    }
    return candidates[candidates.length - 1];
  }
};

// ../uma-tools/umalator-global/skill_data.json
var skill_data_default = { "100011": { alternatives: [{ baseDuration: 5e4, condition: "phase>=2&order>=1&order_rate<=50&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100021": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&order==1&bashin_diff_behind>=1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100031": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&order<=3&bashin_diff_infront<=1&is_overtake==1", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100041": { alternatives: [{ baseDuration: 4e4, condition: "is_finalcorner==1&order<=5&order_rate<=50", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100051": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&order_rate<=30&behind_near_lane_time_set1>=1", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100061": { alternatives: [{ baseDuration: 5e4, condition: "order>=2&order<=5&order_rate<=50&remain_distance<=201&remain_distance>=199", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100071": { alternatives: [{ baseDuration: 6e4, condition: "distance_rate>=50&distance_rate<=60&order_rate>50", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100081": { alternatives: [{ baseDuration: 5e4, condition: "order>=3&order_rate<=50&remain_distance<=200&bashin_diff_infront<=1@order>=3&order_rate<=50&remain_distance<=200&bashin_diff_behind<=1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100091": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&order==1&bashin_diff_behind<=1@distance_rate>=50&order==2&is_overtake==1", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 4 }, "100101": { alternatives: [{ baseDuration: 4e4, condition: "is_finalcorner_laterhalf==1&corner!=0&order>=3&order_rate<=40", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100111": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&change_order_onetime<0&order>=3", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100121": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "is_finalcorner==1&is_behind_in==1&change_order_onetime<0&order_rate>=40" }], rarity: 5 }, "100131": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner!=0&distance_diff_rate<=30", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100141": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&hp_per>=30&order<=2", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 4 }, "100151": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&bashin_diff_behind<=1&order<=4@is_finalcorner==1&bashin_diff_infront<=1&order<=4", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100161": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&order>=2&order_rate<=75&is_behind_in==1&change_order_onetime<0", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "phase==1&blocked_side_continuetime>=2" }, { baseDuration: 5e4, condition: "is_finalcorner==1&order>=2&order_rate<=75&is_behind_in==1&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100171": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&change_order_up_end_after>=3&corner==0", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100181": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner!=0&order>=3&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100191": { alternatives: [{ baseDuration: 5e4, condition: "change_order_up_end_after>=2", effects: [{ modifier: 3500, target: 1, type: 27 }, { modifier: 350, target: 1, type: 28 }], precondition: "" }], rarity: 5 }, "100201": { alternatives: [{ baseDuration: 4e4, condition: "phase>=2&corner!=0&order==1", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100231": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&change_order_onetime<0&order<=4", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100241": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&blocked_side_continuetime>=2&order<=3", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 4 }, "100261": { alternatives: [{ baseDuration: 5e4, condition: "is_badstart==0&temptation_count==0&order<=3&is_finalcorner==1&corner==0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100271": { alternatives: [{ baseDuration: 4e4, condition: "phase>=2&corner!=0&order_rate>=65&order_rate<=70", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 4 }, "100281": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=45&distance_rate<=60&order>=3&order_rate<=50&hp_per<=70", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100301": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "is_finalcorner==1&order<=4&change_order_onetime<0" }], rarity: 5 }, "100321": { alternatives: [{ baseDuration: 4e4, condition: "distance_rate>=50&corner!=0&order>=3&order_rate<=40", effects: [{ modifier: 550, target: 1, type: 9 }, { modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100351": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&order<=5", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "is_finalcorner==1&blocked_side_continuetime>=2" }], rarity: 4 }, "100371": { alternatives: [{ baseDuration: 5e4, condition: "is_badstart==0&temptation_count==0&order>=3&is_finalcorner==1&corner==0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100381": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&distance_rate<=65&order>=2&order_rate<=40&change_order_onetime<0", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100391": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&blocked_side_continuetime>=2", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100401": { alternatives: [{ baseDuration: 6e4, condition: "distance_rate>=50&order_rate>=40&order_rate<=70&is_overtake==1", effects: [{ modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100411": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&order<=3&blocked_side_continuetime>=2", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100451": { alternatives: [{ baseDuration: 0, condition: "phase_random==1&order>=2&order_rate<=40", effects: [{ modifier: 750, target: 1, type: 9 }], precondition: "" }], rarity: 4 }, "100461": { alternatives: [{ baseDuration: 5e4, condition: "phase==1&corner==0&order<=2&bashin_diff_behind<=1", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100501": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&order_rate>=40&order_rate<=75&is_overtake==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "100521": { alternatives: [{ baseDuration: 0, condition: "is_finalcorner==1&corner!=0&order_rate>50&near_count>=1", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 4 }, "100561": { alternatives: [{ baseDuration: 5e4, condition: "phase>=2&order>=3&blocked_front==1", effects: [{ modifier: 3500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 4 }, "100581": { alternatives: [{ baseDuration: 5e4, condition: "phase>=2&corner!=0&order>=3&change_order_onetime<0", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "100601": { alternatives: [{ baseDuration: 5e4, condition: "phase>=2&order==3&bashin_diff_behind<=1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "100611": { alternatives: [{ baseDuration: 5e4, condition: "temptation_count==0&remain_distance<=201&remain_distance>=199&order>=4&order_rate<=70", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "" }], rarity: 4 }, "10071": { alternatives: [{ baseDuration: 6e4, condition: "distance_rate>=50&distance_rate<=60&order_rate>50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10081": { alternatives: [{ baseDuration: 5e4, condition: "order>=3&order_rate<=50&remain_distance<=200&bashin_diff_infront<=1@order>=3&order_rate<=50&remain_distance<=200&bashin_diff_behind<=1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10091": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&order==1&bashin_diff_behind<=1@distance_rate>=50&order==2&is_overtake==1", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 3 }, "10111": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&change_order_onetime<0&order>=3", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10141": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&hp_per>=30&order<=2", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 3 }, "10181": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner!=0&order>=3&change_order_onetime<0", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10241": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&blocked_side_continuetime>=2&order<=3", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 3 }, "10271": { alternatives: [{ baseDuration: 4e4, condition: "phase>=2&corner!=0&order_rate>=65&order_rate<=70", effects: [{ modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 3 }, "10321": { alternatives: [{ baseDuration: 4e4, condition: "distance_rate>=50&corner!=0&order>=3&order_rate<=40", effects: [{ modifier: 350, target: 1, type: 9 }, { modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10351": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&order<=5", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "is_finalcorner==1&blocked_side_continuetime>=2" }], rarity: 3 }, "10411": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&order<=3&blocked_side_continuetime>=2", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10451": { alternatives: [{ baseDuration: 0, condition: "phase_random==1&order>=2&order_rate<=40", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 3 }, "10521": { alternatives: [{ baseDuration: 0, condition: "is_finalcorner==1&corner!=0&order_rate>50&near_count>=1", effects: [{ modifier: 350, target: 1, type: 9 }], precondition: "" }], rarity: 3 }, "10561": { alternatives: [{ baseDuration: 5e4, condition: "phase>=2&order>=3&blocked_front==1", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 3 }, "10601": { alternatives: [{ baseDuration: 5e4, condition: "phase>=2&order==3&bashin_diff_behind<=1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "10611": { alternatives: [{ baseDuration: 5e4, condition: "temptation_count==0&remain_distance<=201&remain_distance>=199&order>=4&order_rate<=70", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 3 }, "110011": { alternatives: [{ baseDuration: 0, condition: "phase==1&order>=2&order_rate<=70&activate_count_middle>=2", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 5 }, "110031": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0", effects: [{ modifier: 4500, target: 1, type: 27 }], precondition: "is_finalcorner==1&is_overtake==1&order<=5&order_rate<=50&overtake_target_no_order_up_time>=2" }], rarity: 5 }, "110041": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&activate_count_heal>=1&order<=3", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "110111": { alternatives: [{ baseDuration: 0, condition: "phase==1&change_order_onetime>0&order_rate>=40", effects: [{ modifier: 750, target: 1, type: 9 }], precondition: "" }], rarity: 5 }, "110131": { alternatives: [{ baseDuration: 6e4, condition: "is_finalcorner==1&hp_per<=45&order<=3&order_rate<=50&bashin_diff_behind<=1&overtake_target_time>=1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "110141": { alternatives: [{ baseDuration: 4e4, condition: "is_finalcorner==1&corner!=0&is_overtake==1&order>=4&order_rate<=75", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "110181": { alternatives: [{ baseDuration: 5e4, condition: "phase==1&order>=3&order_rate<=50&is_overtake==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "110241": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner!=0&order_rate<=40&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }, { baseDuration: 4e4, condition: "is_finalcorner==1&corner!=0&order_rate>=50&order_rate<=80&change_order_onetime<0", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "110301": { alternatives: [{ baseDuration: 0, condition: "phase==1&order>=2&order_rate<=50&overtake_target_time>=1", effects: [{ modifier: 550, target: 1, type: 9 }, { modifier: -50, target: 9, type: 9 }], precondition: "" }], rarity: 5 }, "110451": { alternatives: [{ baseDuration: 5e4, condition: "is_finalcorner==1&corner==0&order<=4&bashin_diff_infront<=1", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 5 }, "110561": { alternatives: [{ baseDuration: 5e4, condition: "distance_rate>=50&order_rate>=40&overtake_target_time>=2", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 5 }, "200011": { alternatives: [{ baseDuration: -1, condition: "rotation==1", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200012": { alternatives: [{ baseDuration: -1, condition: "rotation==1", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200013": { alternatives: [{ baseDuration: -1, condition: "rotation==1", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200021": { alternatives: [{ baseDuration: -1, condition: "rotation==2", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200022": { alternatives: [{ baseDuration: -1, condition: "rotation==2", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200023": { alternatives: [{ baseDuration: -1, condition: "rotation==2", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200031": { alternatives: [{ baseDuration: -1, condition: "track_id==10006", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200032": { alternatives: [{ baseDuration: -1, condition: "track_id==10006", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200033": { alternatives: [{ baseDuration: -1, condition: "track_id==10006", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200041": { alternatives: [{ baseDuration: -1, condition: "track_id==10005", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200042": { alternatives: [{ baseDuration: -1, condition: "track_id==10005", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200043": { alternatives: [{ baseDuration: -1, condition: "track_id==10005", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200051": { alternatives: [{ baseDuration: -1, condition: "track_id==10009", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200052": { alternatives: [{ baseDuration: -1, condition: "track_id==10009", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200053": { alternatives: [{ baseDuration: -1, condition: "track_id==10009", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200061": { alternatives: [{ baseDuration: -1, condition: "track_id==10008", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200062": { alternatives: [{ baseDuration: -1, condition: "track_id==10008", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200063": { alternatives: [{ baseDuration: -1, condition: "track_id==10008", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200071": { alternatives: [{ baseDuration: -1, condition: "track_id==10007", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200072": { alternatives: [{ baseDuration: -1, condition: "track_id==10007", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200073": { alternatives: [{ baseDuration: -1, condition: "track_id==10007", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200081": { alternatives: [{ baseDuration: -1, condition: "track_id==10001", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200082": { alternatives: [{ baseDuration: -1, condition: "track_id==10001", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200083": { alternatives: [{ baseDuration: -1, condition: "track_id==10001", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200091": { alternatives: [{ baseDuration: -1, condition: "track_id==10002", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200092": { alternatives: [{ baseDuration: -1, condition: "track_id==10002", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200093": { alternatives: [{ baseDuration: -1, condition: "track_id==10002", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200101": { alternatives: [{ baseDuration: -1, condition: "track_id==10004", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200102": { alternatives: [{ baseDuration: -1, condition: "track_id==10004", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200103": { alternatives: [{ baseDuration: -1, condition: "track_id==10004", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200111": { alternatives: [{ baseDuration: -1, condition: "track_id==10003", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200112": { alternatives: [{ baseDuration: -1, condition: "track_id==10003", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200113": { alternatives: [{ baseDuration: -1, condition: "track_id==10003", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200121": { alternatives: [{ baseDuration: -1, condition: "track_id==10010", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200122": { alternatives: [{ baseDuration: -1, condition: "track_id==10010", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200123": { alternatives: [{ baseDuration: -1, condition: "track_id==10010", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200131": { alternatives: [{ baseDuration: -1, condition: "is_basis_distance==1", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200132": { alternatives: [{ baseDuration: -1, condition: "is_basis_distance==1", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200133": { alternatives: [{ baseDuration: -1, condition: "is_basis_distance==1", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200141": { alternatives: [{ baseDuration: -1, condition: "is_basis_distance==0", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200142": { alternatives: [{ baseDuration: -1, condition: "is_basis_distance==0", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200143": { alternatives: [{ baseDuration: -1, condition: "is_basis_distance==0", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200151": { alternatives: [{ baseDuration: -1, condition: "ground_condition==1", effects: [{ modifier: 6e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200152": { alternatives: [{ baseDuration: -1, condition: "ground_condition==1", effects: [{ modifier: 4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200153": { alternatives: [{ baseDuration: -1, condition: "ground_condition==1", effects: [{ modifier: -4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200161": { alternatives: [{ baseDuration: -1, condition: "ground_condition==2@ground_condition==3@ground_condition==4", effects: [{ modifier: 6e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200162": { alternatives: [{ baseDuration: -1, condition: "ground_condition==2@ground_condition==3@ground_condition==4", effects: [{ modifier: 4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200163": { alternatives: [{ baseDuration: -1, condition: "ground_condition==2@ground_condition==3@ground_condition==4", effects: [{ modifier: -4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200171": { alternatives: [{ baseDuration: -1, condition: "season==1@season==5", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200172": { alternatives: [{ baseDuration: -1, condition: "season==1@season==5", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200173": { alternatives: [{ baseDuration: -1, condition: "season==1@season==5", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200181": { alternatives: [{ baseDuration: -1, condition: "season==2", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200182": { alternatives: [{ baseDuration: -1, condition: "season==2", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200183": { alternatives: [{ baseDuration: -1, condition: "season==2", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200191": { alternatives: [{ baseDuration: -1, condition: "season==3", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200192": { alternatives: [{ baseDuration: -1, condition: "season==3", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200193": { alternatives: [{ baseDuration: -1, condition: "season==3", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200201": { alternatives: [{ baseDuration: -1, condition: "season==4", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200202": { alternatives: [{ baseDuration: -1, condition: "season==4", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200203": { alternatives: [{ baseDuration: -1, condition: "season==4", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200211": { alternatives: [{ baseDuration: -1, condition: "weather==1", effects: [{ modifier: 6e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200212": { alternatives: [{ baseDuration: -1, condition: "weather==1", effects: [{ modifier: 4e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200221": { alternatives: [{ baseDuration: -1, condition: "weather==2", effects: [{ modifier: 6e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200222": { alternatives: [{ baseDuration: -1, condition: "weather==2", effects: [{ modifier: 4e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200231": { alternatives: [{ baseDuration: -1, condition: "weather==3", effects: [{ modifier: 6e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200232": { alternatives: [{ baseDuration: -1, condition: "weather==3", effects: [{ modifier: 4e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200233": { alternatives: [{ baseDuration: -1, condition: "weather==3", effects: [{ modifier: -4e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200241": { alternatives: [{ baseDuration: -1, condition: "weather==4", effects: [{ modifier: 6e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200242": { alternatives: [{ baseDuration: -1, condition: "weather==4", effects: [{ modifier: 4e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200251": { alternatives: [{ baseDuration: -1, condition: "post_number<=3", effects: [{ modifier: 6e5, target: 1, type: 5 }], precondition: "" }], rarity: 1 }, "200252": { alternatives: [{ baseDuration: -1, condition: "post_number<=3", effects: [{ modifier: 4e5, target: 1, type: 5 }], precondition: "" }], rarity: 1 }, "200253": { alternatives: [{ baseDuration: -1, condition: "post_number<=3", effects: [{ modifier: -4e5, target: 1, type: 5 }], precondition: "" }], rarity: 1 }, "200261": { alternatives: [{ baseDuration: -1, condition: "post_number>=6", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200262": { alternatives: [{ baseDuration: -1, condition: "post_number>=6", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200263": { alternatives: [{ baseDuration: -1, condition: "post_number>=6", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200271": { alternatives: [{ baseDuration: -1, condition: "running_style_count_same<=1", effects: [{ modifier: 8e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200272": { alternatives: [{ baseDuration: -1, condition: "running_style_count_same<=1", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200281": { alternatives: [{ baseDuration: -1, condition: "running_style_count_same_rate>=40", effects: [{ modifier: 6e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200282": { alternatives: [{ baseDuration: -1, condition: "running_style_count_same_rate>=40", effects: [{ modifier: 4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200283": { alternatives: [{ baseDuration: -1, condition: "running_style_count_same_rate>=40", effects: [{ modifier: -4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "200291": { alternatives: [{ baseDuration: -1, condition: "running_style_equal_popularity_one==1", effects: [{ modifier: 6e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200292": { alternatives: [{ baseDuration: -1, condition: "running_style_equal_popularity_one==1", effects: [{ modifier: 4e5, target: 1, type: 4 }], precondition: "" }], rarity: 1 }, "200301": { alternatives: [{ baseDuration: -1, condition: "popularity>=4", effects: [{ modifier: 6e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200302": { alternatives: [{ baseDuration: -1, condition: "popularity>=4", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200311": { alternatives: [{ baseDuration: -1, condition: "grade==100", effects: [{ modifier: -4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "200321": { alternatives: [{ baseDuration: -1, condition: "popularity==1", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200331": { alternatives: [{ baseDuration: 24e3, condition: "all_corner_random==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200332": { alternatives: [{ baseDuration: 24e3, condition: "all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200333": { alternatives: [{ baseDuration: 24e3, condition: "all_corner_random==1", effects: [{ modifier: -2e3, target: 1, type: 21 }], precondition: "" }], rarity: 1 }, "200341": { alternatives: [{ baseDuration: 3e4, condition: "all_corner_random==1", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200342": { alternatives: [{ baseDuration: 3e4, condition: "all_corner_random==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200343": { alternatives: [{ baseDuration: 3e4, condition: "all_corner_random==1", effects: [{ modifier: -2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200351": { alternatives: [{ baseDuration: 0, condition: "corner_random==1@corner_random==2@corner_random==3@corner_random==4", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200352": { alternatives: [{ baseDuration: 0, condition: "corner_random==1@corner_random==2@corner_random==3@corner_random==4", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200353": { alternatives: [{ baseDuration: 0, condition: "corner_random==1@corner_random==2@corner_random==3@corner_random==4", effects: [{ modifier: -200, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200361": { alternatives: [{ baseDuration: 24e3, condition: "straight_random==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200362": { alternatives: [{ baseDuration: 24e3, condition: "straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200371": { alternatives: [{ baseDuration: 3e4, condition: "straight_random==1", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200372": { alternatives: [{ baseDuration: 3e4, condition: "straight_random==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200381": { alternatives: [{ baseDuration: 0, condition: "straight_random==1", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200382": { alternatives: [{ baseDuration: 0, condition: "straight_random==1", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200391": { alternatives: [{ baseDuration: 0, condition: "up_slope_random==1", effects: [{ modifier: -200, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200401": { alternatives: [{ baseDuration: 0, condition: "accumulatetime>=2&is_surrounded==1", effects: [{ modifier: -200, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200411": { alternatives: [{ baseDuration: 3e4, condition: "last_straight_random==1&distance_diff_rate>=75", effects: [{ modifier: -2e3, target: 1, type: 21 }], precondition: "" }], rarity: 1 }, "200421": { alternatives: [{ baseDuration: 3e4, condition: "remain_distance==200&order==1&bashin_diff_behind>=1", effects: [{ modifier: -2e3, target: 1, type: 21 }], precondition: "" }], rarity: 1 }, "200431": { alternatives: [{ baseDuration: 0, condition: "always==1", effects: [{ modifier: 4e3, target: 1, type: 10 }], precondition: "" }], rarity: 2 }, "200432": { alternatives: [{ baseDuration: 0, condition: "always==1", effects: [{ modifier: 9e3, target: 1, type: 10 }], precondition: "" }], rarity: 1 }, "200433": { alternatives: [{ baseDuration: 0, condition: "always==1", effects: [{ modifier: 15e3, target: 1, type: 10 }], precondition: "" }], rarity: 1 }, "200441": { alternatives: [{ baseDuration: 0, condition: "phase<=1&accumulatetime>=5&blocked_front_continuetime>=1", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200442": { alternatives: [{ baseDuration: 0, condition: "phase<=1&accumulatetime>=5&blocked_front_continuetime>=1", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200451": { alternatives: [{ baseDuration: 3e4, condition: "phase_random==0", effects: [{ modifier: 450, target: 1, type: 28 }], precondition: "" }], rarity: 2 }, "200452": { alternatives: [{ baseDuration: 3e4, condition: "phase_random==0", effects: [{ modifier: 350, target: 1, type: 28 }], precondition: "" }], rarity: 1 }, "200461": { alternatives: [{ baseDuration: 18e3, condition: "phase==1&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200462": { alternatives: [{ baseDuration: 18e3, condition: "phase==1&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200471": { alternatives: [{ baseDuration: 0, condition: "phase==1&change_order_onetime>0", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200472": { alternatives: [{ baseDuration: 0, condition: "phase==1&change_order_onetime>0", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200481": { alternatives: [{ baseDuration: 0, condition: "phase==1&is_surrounded==1", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200482": { alternatives: [{ baseDuration: 0, condition: "phase==1&is_surrounded==1", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200491": { alternatives: [{ baseDuration: 3e4, condition: "infront_near_lane_time>=1&is_lastspurt==1&hp_per>=1", effects: [{ modifier: 4e3, target: 1, type: 31 }, { modifier: 250, target: 1, type: 28 }], precondition: "" }], rarity: 2 }, "200492": { alternatives: [{ baseDuration: 3e4, condition: "infront_near_lane_time>=1&is_lastspurt==1&hp_per>=1", effects: [{ modifier: 2e3, target: 1, type: 31 }, { modifier: 50, target: 1, type: 28 }], precondition: "" }], rarity: 1 }, "200501": { alternatives: [{ baseDuration: 3e4, condition: "phase_random==2", effects: [{ modifier: 350, target: 1, type: 28 }], precondition: "" }], rarity: 2 }, "200502": { alternatives: [{ baseDuration: 3e4, condition: "phase_random==2", effects: [{ modifier: 250, target: 1, type: 28 }], precondition: "" }], rarity: 1 }, "200511": { alternatives: [{ baseDuration: 24e3, condition: "is_lastspurt==1&phase_random==3", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200512": { alternatives: [{ baseDuration: 24e3, condition: "is_lastspurt==1&phase_random==3", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200521": { alternatives: [{ baseDuration: 0, condition: "accumulatetime>=2&order==1&bashin_diff_behind>=1", effects: [{ modifier: -200, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200531": { alternatives: [{ baseDuration: 12e3, condition: "running_style==1&phase==0", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200532": { alternatives: [{ baseDuration: 12e3, condition: "running_style==1&phase==0", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200541": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase_random==1&order_rate<=50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200542": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase_random==1&order_rate<=50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200551": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&is_finalcorner_random==1&order==1", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200552": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&is_finalcorner_random==1&order==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200561": { alternatives: [{ baseDuration: 0, condition: "running_style==2&phase_laterhalf_random==0&order_rate<=50", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200562": { alternatives: [{ baseDuration: 0, condition: "running_style==2&phase_laterhalf_random==0&order_rate<=50", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200571": { alternatives: [{ baseDuration: 0, condition: "running_style==2&phase_random==1&order_rate<=50", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200572": { alternatives: [{ baseDuration: 0, condition: "running_style==2&phase_random==1&order_rate<=50", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200581": { alternatives: [{ baseDuration: 18e3, condition: "running_style==2&is_finalcorner_random==1&order_rate<=50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200582": { alternatives: [{ baseDuration: 18e3, condition: "running_style==2&is_finalcorner_random==1&order_rate<=50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200591": { alternatives: [{ baseDuration: 24e3, condition: "running_style==3&phase_random==1&order_rate>50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200592": { alternatives: [{ baseDuration: 24e3, condition: "running_style==3&phase_random==1&order_rate>50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200601": { alternatives: [{ baseDuration: 18e3, condition: "running_style==3&phase_random==2&order_rate>50", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200602": { alternatives: [{ baseDuration: 18e3, condition: "running_style==3&phase_random==2&order_rate>50", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200611": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&is_finalcorner==1&corner!=0&is_behind_in==1&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200612": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&is_finalcorner==1&corner!=0&is_behind_in==1&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200621": { alternatives: [{ baseDuration: 0, condition: "running_style==4&phase_random==1&distance_diff_rate>=75", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200622": { alternatives: [{ baseDuration: 0, condition: "running_style==4&phase_random==1&distance_diff_rate>=75", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200631": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&phase_random==2&distance_diff_rate>=50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200632": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&phase_random==2&distance_diff_rate>=50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200641": { alternatives: [{ baseDuration: 9e3, condition: "running_style==4&is_lastspurt==1&corner==0", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200642": { alternatives: [{ baseDuration: 9e3, condition: "running_style==4&is_lastspurt==1&corner==0", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200651": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&straight_random==1", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200652": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&straight_random==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200662": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_random==1&order_rate>50", effects: [{ modifier: 150, target: 1, type: 9 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200671": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_random==2&order_rate>50", effects: [{ modifier: 3500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200672": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_random==2&order_rate>50", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 500, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200681": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==0&accumulatetime>=5&order_rate<=50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200682": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==0&accumulatetime>=5&order_rate<=50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200691": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_laterhalf_random==0&order_rate>50", effects: [{ modifier: 550, target: 1, type: 9 }, { modifier: -2e3, target: 9, type: 21 }], precondition: "" }], rarity: 2 }, "200692": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_laterhalf_random==0&order_rate>50", effects: [{ modifier: 150, target: 1, type: 9 }, { modifier: -500, target: 9, type: 21 }], precondition: "" }], rarity: 1 }, "200701": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==2&order_rate>50", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200702": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==2&order_rate>50", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200711": { alternatives: [{ baseDuration: 0, condition: "distance_type==3&phase_random==1&order<=3", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200712": { alternatives: [{ baseDuration: 0, condition: "distance_type==3&phase_random==1&order<=3", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200721": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==3&phase_random==1&order_rate<=50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200722": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==3&phase_random==1&order_rate<=50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200731": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&is_finalcorner==1&corner!=0&change_order_onetime>0", effects: [{ modifier: 3500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200732": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&is_finalcorner==1&corner!=0&change_order_onetime>0", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 500, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "200741": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&straight_random==1", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200742": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&straight_random==1", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200751": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&is_finalcorner==1&corner!=0&lane_type==0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200752": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&is_finalcorner==1&corner!=0&lane_type==0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200761": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&hp_per<=30", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "200762": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&hp_per<=30", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "200771": { alternatives: [{ baseDuration: 0, condition: "phase==1&order_rate<=50&temptation_count_behind>=1", effects: [{ modifier: -100, target: 20, type: 9 }], precondition: "" }], rarity: 1 }, "200772": { alternatives: [{ baseDuration: 0, condition: "phase==1&order_rate<=50&temptation_count_behind>=1", effects: [{ modifier: -300, target: 20, type: 9 }], precondition: "" }], rarity: 2 }, "200781": { alternatives: [{ baseDuration: 0, condition: "phase==1&order_rate>50&temptation_count_infront>=1", effects: [{ modifier: -100, target: 19, type: 9 }], precondition: "" }], rarity: 1 }, "200791": { alternatives: [{ baseDuration: 0, condition: "running_style_temptation_count_nige>=1&is_temptation==0", effects: [{ modifier: 5e4, target: 21, type: 13 }], precondition: "" }], rarity: 1 }, "200801": { alternatives: [{ baseDuration: 0, condition: "running_style_temptation_count_senko>=1&is_temptation==0", effects: [{ modifier: 5e4, target: 21, type: 13 }], precondition: "" }], rarity: 1 }, "200811": { alternatives: [{ baseDuration: 0, condition: "running_style_temptation_count_sashi>=1&is_temptation==0", effects: [{ modifier: 5e4, target: 21, type: 13 }], precondition: "" }], rarity: 1 }, "200821": { alternatives: [{ baseDuration: 0, condition: "running_style_temptation_count_oikomi>=1&is_temptation==0", effects: [{ modifier: 5e4, target: 21, type: 13 }], precondition: "" }], rarity: 1 }, "200831": { alternatives: [{ baseDuration: 0, condition: "running_style_count_nige_otherself>=1&phase_random==0&accumulatetime>=5", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200841": { alternatives: [{ baseDuration: 0, condition: "running_style_count_nige_otherself>=1&phase_random==1", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200851": { alternatives: [{ baseDuration: 3e4, condition: "running_style_count_nige_otherself>=1&phase_random==2", effects: [{ modifier: -1500, target: 18, type: 21 }], precondition: "" }], rarity: 1 }, "200861": { alternatives: [{ baseDuration: 0, condition: "running_style_count_senko_otherself>=1&phase_random==0&accumulatetime>=5", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200871": { alternatives: [{ baseDuration: 0, condition: "running_style_count_senko_otherself>=1&phase_random==1", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200881": { alternatives: [{ baseDuration: 3e4, condition: "running_style_count_senko_otherself>=1&phase_random==2", effects: [{ modifier: -1500, target: 18, type: 21 }], precondition: "" }], rarity: 1 }, "200891": { alternatives: [{ baseDuration: 0, condition: "running_style_count_sashi_otherself>=1&phase_random==0&accumulatetime>=5", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200901": { alternatives: [{ baseDuration: 0, condition: "running_style_count_sashi_otherself>=1&phase_random==1", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200911": { alternatives: [{ baseDuration: 3e4, condition: "running_style_count_sashi_otherself>=1&phase_random==2", effects: [{ modifier: -1500, target: 18, type: 21 }], precondition: "" }], rarity: 1 }, "200921": { alternatives: [{ baseDuration: 0, condition: "running_style_count_oikomi_otherself>=1&phase_random==0&accumulatetime>=5", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200931": { alternatives: [{ baseDuration: 0, condition: "running_style_count_oikomi_otherself>=1&phase_random==1", effects: [{ modifier: -100, target: 18, type: 9 }], precondition: "" }], rarity: 1 }, "200941": { alternatives: [{ baseDuration: 3e4, condition: "running_style_count_oikomi_otherself>=1&phase_random==2", effects: [{ modifier: -1500, target: 18, type: 21 }], precondition: "" }], rarity: 1 }, "200951": { alternatives: [{ baseDuration: -1, condition: "track_id==10101", effects: [{ modifier: 6e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200952": { alternatives: [{ baseDuration: -1, condition: "track_id==10101", effects: [{ modifier: 4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200953": { alternatives: [{ baseDuration: -1, condition: "track_id==10101", effects: [{ modifier: -4e5, target: 1, type: 2 }], precondition: "" }], rarity: 1 }, "200961": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200962": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200971": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200972": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200981": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase==1&bashin_diff_behind>=3&order==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "200982": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase==1&bashin_diff_behind>=3&order==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "200991": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_laterhalf_random==1&order>=2&order_rate<=50", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "200992": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_laterhalf_random==1&order>=2&order_rate<=50", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201001": { alternatives: [{ baseDuration: 4e4, condition: "distance_type==1&phase_random==1", effects: [{ modifier: 350, target: 1, type: 28 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201002": { alternatives: [{ baseDuration: 4e4, condition: "distance_type==1&phase_random==1", effects: [{ modifier: 250, target: 1, type: 28 }, { modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201011": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_random==0&order_rate<=50&accumulatetime>=5", effects: [{ modifier: -2500, target: 10, type: 21 }], precondition: "" }], rarity: 2 }, "201012": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==1&phase_random==0&order_rate<=50&accumulatetime>=5", effects: [{ modifier: -2e3, target: 10, type: 21 }], precondition: "" }], rarity: 1 }, "201021": { alternatives: [{ baseDuration: 12e3, condition: "distance_type==1&phase_random==0&order_rate>50&accumulatetime>=5", effects: [{ modifier: -300, target: 9, type: 9 }, { modifier: -2e3, target: 9, type: 31 }], precondition: "" }], rarity: 2 }, "201022": { alternatives: [{ baseDuration: 12e3, condition: "distance_type==1&phase_random==0&order_rate>50&accumulatetime>=5", effects: [{ modifier: -100, target: 9, type: 9 }, { modifier: -500, target: 9, type: 31 }], precondition: "" }], rarity: 1 }, "201031": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201032": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201041": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201042": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201051": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==2&phase_random==1&order_rate<=50", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201052": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==2&phase_random==1&order_rate<=50", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201061": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase==1&change_order_onetime<0", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201062": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase==1&change_order_onetime<0", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201071": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==2&is_overtake==1&accumulatetime>=5", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201072": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==2&is_overtake==1&accumulatetime>=5", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201081": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==1&order<=3", effects: [{ modifier: -2e3, target: 10, type: 21 }, { modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201082": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==1&order<=3", effects: [{ modifier: -1500, target: 10, type: 21 }, { modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201091": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==0&order_rate>50&accumulatetime>=3", effects: [{ modifier: -3e3, target: 9, type: 31 }], precondition: "" }], rarity: 2 }, "201092": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==2&phase_random==0&order_rate>50&accumulatetime>=3", effects: [{ modifier: -1e3, target: 9, type: 31 }], precondition: "" }], rarity: 1 }, "201101": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201102": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201111": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201112": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201121": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&phase_random==0", effects: [{ modifier: 15e4, target: 1, type: 8 }], precondition: "" }], rarity: 2 }, "201122": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&phase_random==0", effects: [{ modifier: 1e5, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201131": { alternatives: [{ baseDuration: 4e4, condition: "distance_type==3&phase_random==1&order_rate>50", effects: [{ modifier: 350, target: 1, type: 28 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201132": { alternatives: [{ baseDuration: 4e4, condition: "distance_type==3&phase_random==1&order_rate>50", effects: [{ modifier: 250, target: 1, type: 28 }, { modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201141": { alternatives: [{ baseDuration: 0, condition: "distance_type==3&is_move_lane==1&accumulatetime>=10@distance_type==3&is_move_lane==2&accumulatetime>=10", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201142": { alternatives: [{ baseDuration: 0, condition: "distance_type==3&is_move_lane==1&accumulatetime>=10@distance_type==3&is_move_lane==2&accumulatetime>=10", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201151": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&phase_random==2&order_rate>50", effects: [{ modifier: -2500, target: 9, type: 21 }], precondition: "" }], rarity: 2 }, "201152": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==3&phase_random==2&order_rate>50", effects: [{ modifier: -1500, target: 9, type: 21 }], precondition: "" }], rarity: 1 }, "201161": { alternatives: [{ baseDuration: 0, condition: "distance_type==3&phase==1&blocked_front_continuetime>=1", effects: [{ modifier: -300, target: 9, type: 9 }], precondition: "" }], rarity: 2 }, "201162": { alternatives: [{ baseDuration: 0, condition: "distance_type==3&phase==1&blocked_front_continuetime>=1", effects: [{ modifier: -100, target: 9, type: 9 }], precondition: "" }], rarity: 1 }, "201171": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201172": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201181": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201182": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201191": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&phase_random==1&bashin_diff_behind>=1&order==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201192": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&phase_random==1&bashin_diff_behind>=1&order==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201202": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&is_overtake==1&accumulatetime>=5", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201211": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&phase==2&change_order_onetime<0", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201212": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&phase==2&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201221": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&phase_random==1&order>=5", effects: [{ modifier: -100, target: 9, type: 9 }, { modifier: 350, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201222": { alternatives: [{ baseDuration: 0, condition: "distance_type==4&phase_random==1&order>=5", effects: [{ modifier: -50, target: 9, type: 9 }, { modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201231": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&phase_random==2", effects: [{ modifier: -1e5, target: 9, type: 8 }], precondition: "" }], rarity: 2 }, "201232": { alternatives: [{ baseDuration: 3e4, condition: "distance_type==4&phase_random==2", effects: [{ modifier: -5e4, target: 9, type: 8 }], precondition: "" }], rarity: 1 }, "201241": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201242": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201251": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201252": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201261": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase==0&blocked_front_continuetime>=1@running_style==1&phase==0&blocked_side_continuetime>=1", effects: [{ modifier: 350, target: 1, type: 28 }, { modifier: 5e3, target: 1, type: 35 }], precondition: "" }], rarity: 2 }, "201262": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase==0&blocked_front_continuetime>=1@running_style==1&phase==0&blocked_side_continuetime>=1", effects: [{ modifier: 250, target: 1, type: 28 }, { modifier: 5e3, target: 1, type: 35 }], precondition: "" }], rarity: 1 }, "201272": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase<=1&change_order_onetime>0&accumulatetime>=5@running_style==1&phase<=1&blocked_side_continuetime>=2&accumulatetime>=5", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201281": { alternatives: [{ baseDuration: 0, condition: "running_style==1&slope==1&accumulatetime>=10", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201282": { alternatives: [{ baseDuration: 0, condition: "running_style==1&slope==1&accumulatetime>=10", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201291": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase_random==1&order>=2", effects: [{ modifier: 4e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201292": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase_random==1&order>=2", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201302": { alternatives: [{ baseDuration: 3e4, condition: "running_style==1&phase_random==0&order>=2&accumulatetime>=5", effects: [{ modifier: -1e3, target: 9, type: 31 }], precondition: "" }], rarity: 1 }, "201311": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201312": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201321": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201322": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201331": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&is_move_lane==1@running_style==2&is_move_lane==2", effects: [{ modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201332": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&is_move_lane==1@running_style==2&is_move_lane==2", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201341": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&down_slope_random==1", effects: [{ modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201342": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&down_slope_random==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201351": { alternatives: [{ baseDuration: 0, condition: "running_style==2&phase_random==1", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201352": { alternatives: [{ baseDuration: 0, condition: "running_style==2&phase_random==1", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201361": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&phase_random==1&order_rate>40", effects: [{ modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201362": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&phase_random==1&order_rate>40", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201371": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&phase_random==2&order_rate<=50", effects: [{ modifier: -5e4, target: 10, type: 8 }], precondition: "" }], rarity: 2 }, "201372": { alternatives: [{ baseDuration: 3e4, condition: "running_style==2&phase_random==2&order_rate<=50", effects: [{ modifier: -3e4, target: 10, type: 8 }], precondition: "" }], rarity: 1 }, "201381": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201382": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201391": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201392": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201401": { alternatives: [{ baseDuration: 4e4, condition: "running_style==3&is_overtake==1&accumulatetime>=5", effects: [{ modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201402": { alternatives: [{ baseDuration: 4e4, condition: "running_style==3&is_overtake==1&accumulatetime>=5", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201411": { alternatives: [{ baseDuration: 24e3, condition: "running_style==3&up_slope_random==1", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201412": { alternatives: [{ baseDuration: 24e3, condition: "running_style==3&up_slope_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201421": { alternatives: [{ baseDuration: 0, condition: "running_style==3&phase_random==2", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201422": { alternatives: [{ baseDuration: 0, condition: "running_style==3&phase_random==2", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201431": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&phase_random==1", effects: [{ modifier: 15e4, target: 1, type: 8 }], precondition: "" }], rarity: 2 }, "201432": { alternatives: [{ baseDuration: 3e4, condition: "running_style==3&phase_random==1", effects: [{ modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201441": { alternatives: [{ baseDuration: 0, condition: "running_style==3&phase_random==2&order_rate>50", effects: [{ modifier: -300, target: 4, type: 9 }], precondition: "" }], rarity: 2 }, "201442": { alternatives: [{ baseDuration: 0, condition: "running_style==3&phase_random==2&order_rate>50", effects: [{ modifier: -100, target: 4, type: 9 }], precondition: "" }], rarity: 1 }, "201451": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&straight_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201452": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&straight_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201461": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&all_corner_random==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201462": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&all_corner_random==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201471": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&is_move_lane==1@running_style==4&is_move_lane==2", effects: [{ modifier: 1e5, target: 1, type: 8 }], precondition: "" }], rarity: 2 }, "201472": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&is_move_lane==1@running_style==4&is_move_lane==2", effects: [{ modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201481": { alternatives: [{ baseDuration: 0, condition: "running_style==4&slope==2&accumulatetime>=10", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201482": { alternatives: [{ baseDuration: 0, condition: "running_style==4&slope==2&accumulatetime>=10", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201491": { alternatives: [{ baseDuration: 0, condition: "running_style==4&blocked_front_continuetime>=1&accumulatetime>=10", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201492": { alternatives: [{ baseDuration: 0, condition: "running_style==4&blocked_front_continuetime>=1&accumulatetime>=10", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201501": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&phase_random==2&order_rate>50", effects: [{ modifier: 15e4, target: 1, type: 8 }], precondition: "" }], rarity: 2 }, "201502": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&phase_random==2&order_rate>50", effects: [{ modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201511": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&phase_random==2&order>=2", effects: [{ modifier: -2500, target: 4, type: 21 }], precondition: "" }], rarity: 2 }, "201512": { alternatives: [{ baseDuration: 3e4, condition: "running_style==4&phase_random==2&order>=2", effects: [{ modifier: -1500, target: 4, type: 21 }], precondition: "" }], rarity: 1 }, "201521": { alternatives: [{ baseDuration: -1, condition: "running_style==1", effects: [{ modifier: 6e5, target: 1, type: 5 }, { modifier: 1e5, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201522": { alternatives: [{ baseDuration: -1, condition: "running_style==1", effects: [{ modifier: 4e5, target: 1, type: 5 }, { modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201531": { alternatives: [{ baseDuration: -1, condition: "running_style==2", effects: [{ modifier: 6e5, target: 1, type: 5 }, { modifier: 1e5, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201532": { alternatives: [{ baseDuration: -1, condition: "running_style==2", effects: [{ modifier: 4e5, target: 1, type: 5 }, { modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201541": { alternatives: [{ baseDuration: -1, condition: "running_style==3", effects: [{ modifier: 6e5, target: 1, type: 5 }, { modifier: 1e5, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201542": { alternatives: [{ baseDuration: -1, condition: "running_style==3", effects: [{ modifier: 4e5, target: 1, type: 5 }, { modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201551": { alternatives: [{ baseDuration: -1, condition: "running_style==4", effects: [{ modifier: 6e5, target: 1, type: 5 }, { modifier: 1e5, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201552": { alternatives: [{ baseDuration: -1, condition: "running_style==4", effects: [{ modifier: 4e5, target: 1, type: 5 }, { modifier: 5e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "201561": { alternatives: [{ baseDuration: -1, condition: "random_lot==50&post_number==7", effects: [{ modifier: 6e5, target: 1, type: 1 }, { modifier: 6e5, target: 1, type: 2 }, { modifier: 6e5, target: 1, type: 3 }], precondition: "" }], rarity: 2 }, "201562": { alternatives: [{ baseDuration: -1, condition: "random_lot==50&post_number==7", effects: [{ modifier: 4e5, target: 1, type: 1 }, { modifier: 4e5, target: 1, type: 2 }, { modifier: 4e5, target: 1, type: 3 }], precondition: "" }], rarity: 1 }, "201571": { alternatives: [{ baseDuration: 0, condition: "remain_distance<=778&remain_distance>=776", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201581": { alternatives: [{ baseDuration: 3e4, condition: "up_slope_random==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201591": { alternatives: [{ baseDuration: 3e4, condition: "near_count>=3&accumulatetime>=5", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201592": { alternatives: [{ baseDuration: 3e4, condition: "near_count>=3&accumulatetime>=5", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201601": { alternatives: [{ baseDuration: 3e4, condition: "activate_count_start>=3", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201611": { alternatives: [{ baseDuration: 3e4, condition: "activate_count_middle>=3", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201621": { alternatives: [{ baseDuration: 0, condition: "activate_count_end_after>=3", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201631": { alternatives: [{ baseDuration: -1, condition: "same_skill_horse_count>=5", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "201641": { alternatives: [{ baseDuration: -1, condition: "same_skill_horse_count==1", effects: [{ modifier: 4e5, target: 1, type: 1 }], precondition: "" }], rarity: 1 }, "201651": { alternatives: [{ baseDuration: 3e4, condition: "infront_near_lane_time>=3&accumulatetime>=10", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201661": { alternatives: [{ baseDuration: 3e4, condition: "behind_near_lane_time>=3&accumulatetime>=10", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201671": { alternatives: [{ baseDuration: 24e3, condition: "ground_type==2&phase==1&blocked_side_continuetime>=2", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201672": { alternatives: [{ baseDuration: 24e3, condition: "ground_type==2&phase==1&blocked_side_continuetime>=2", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201681": { alternatives: [{ baseDuration: 3e4, condition: "ground_type==2&phase_random==2", effects: [{ modifier: 350, target: 1, type: 28 }, { modifier: 3e3, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "201682": { alternatives: [{ baseDuration: 3e4, condition: "ground_type==2&phase_random==2", effects: [{ modifier: 250, target: 1, type: 28 }, { modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "201691": { alternatives: [{ baseDuration: 0, condition: "running_style==3&phase_laterhalf_random==0&order_rate>=50", effects: [{ modifier: 550, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "201692": { alternatives: [{ baseDuration: 0, condition: "running_style==3&phase_laterhalf_random==0&order_rate>=50", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "201701": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==3&is_lastspurt==1&corner==0&order_rate>=20&order_rate<=60", effects: [{ modifier: 3500, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "201702": { alternatives: [{ baseDuration: 24e3, condition: "distance_type==3&is_lastspurt==1&corner==0&order_rate>=20&order_rate<=60", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "201902": { alternatives: [{ baseDuration: 18e3, condition: "running_style==2&phase_random==2&order_rate<=50", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "202022": { alternatives: [{ baseDuration: 4e4, condition: "running_style==4&phase_random==1&order_rate>=50", effects: [{ modifier: 500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "202032": { alternatives: [{ baseDuration: 18e3, condition: "distance_rate_after_random==50", effects: [{ modifier: 2500, target: 1, type: 27 }, { modifier: -1e4, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "202051": { alternatives: [{ baseDuration: -1, condition: "running_style==1", effects: [{ modifier: 0, target: 1, type: 6 }], precondition: "" }], rarity: 2 }, "210011": { alternatives: [{ baseDuration: 18e3, condition: "phase_random==1", effects: [{ modifier: 4200, target: 1, type: 27 }], precondition: "" }], rarity: 2 }, "210012": { alternatives: [{ baseDuration: 18e3, condition: "phase_random==1", effects: [{ modifier: 1800, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "210021": { alternatives: [{ baseDuration: 0, condition: "phase_random==1", effects: [{ modifier: 660, target: 1, type: 9 }], precondition: "" }], rarity: 2 }, "210022": { alternatives: [{ baseDuration: 0, condition: "phase_random==1", effects: [{ modifier: 180, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "210031": { alternatives: [{ baseDuration: 12e3, condition: "phase_random==2", effects: [{ modifier: 4800, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "210032": { alternatives: [{ baseDuration: 12e3, condition: "phase_random==2", effects: [{ modifier: 2400, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "210041": { alternatives: [{ baseDuration: 18e3, condition: "phase_random==2", effects: [{ modifier: 3e3, target: 1, type: 27 }, { modifier: 3600, target: 1, type: 31 }], precondition: "" }], rarity: 2 }, "210042": { alternatives: [{ baseDuration: 18e3, condition: "phase_random==2", effects: [{ modifier: 600, target: 1, type: 27 }, { modifier: 1200, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "210051": { alternatives: [{ baseDuration: 4e4, condition: "phase_random==0", effects: [{ modifier: 420, target: 1, type: 28 }, { modifier: 18e4, target: 1, type: 8 }], precondition: "" }], rarity: 2 }, "210052": { alternatives: [{ baseDuration: 4e4, condition: "phase_random==0", effects: [{ modifier: 180, target: 1, type: 28 }, { modifier: 6e4, target: 1, type: 8 }], precondition: "" }], rarity: 1 }, "900011": { alternatives: [{ baseDuration: 3e4, condition: "phase>=2&order>=1&order_rate<=50&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 500, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900021": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=50&order==1&bashin_diff_behind>=1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900031": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&order<=3&bashin_diff_infront<=1&is_overtake==1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900041": { alternatives: [{ baseDuration: 24e3, condition: "is_finalcorner==1&order<=5&order_rate<=50", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900051": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&order_rate<=30&behind_near_lane_time_set1>=1", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900061": { alternatives: [{ baseDuration: 3e4, condition: "order>=2&order<=5&order_rate<=50&remain_distance<=201&remain_distance>=199", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900071": { alternatives: [{ baseDuration: 36e3, condition: "distance_rate>=50&distance_rate<=60&order_rate>50", effects: [{ modifier: 500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900081": { alternatives: [{ baseDuration: 3e4, condition: "order>=3&order_rate<=50&remain_distance<=200&bashin_diff_infront<=1@order>=3&order_rate<=50&remain_distance<=200&bashin_diff_behind<=1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900091": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=50&order==1&bashin_diff_behind<=1@distance_rate>=50&order==2&is_overtake==1", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900101": { alternatives: [{ baseDuration: 24e3, condition: "is_finalcorner_laterhalf==1&corner!=0&order>=3&order_rate<=40", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900111": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&change_order_onetime<0&order>=3", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900121": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "is_finalcorner==1&is_behind_in==1&change_order_onetime<0&order_rate>=40" }], rarity: 1 }, "900131": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner!=0&distance_diff_rate<=30", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900141": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&hp_per>=30&order<=2", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900151": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&bashin_diff_behind<=1&order<=4@is_finalcorner==1&bashin_diff_infront<=1&order<=4", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900161": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&order>=2&order_rate<=75&is_behind_in==1&change_order_onetime<0", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "phase==1&blocked_side_continuetime>=2" }, { baseDuration: 3e4, condition: "is_finalcorner==1&order>=2&order_rate<=75&is_behind_in==1&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900171": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&change_order_up_end_after>=3&corner==0", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900181": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner!=0&order>=3&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900191": { alternatives: [{ baseDuration: 3e4, condition: "change_order_up_end_after>=2", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 150, target: 1, type: 28 }], precondition: "" }], rarity: 1 }, "900201": { alternatives: [{ baseDuration: 24e3, condition: "phase>=2&corner!=0&order==1", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900231": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&change_order_onetime<0&order<=4", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900241": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&blocked_side_continuetime>=2&order<=3", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900261": { alternatives: [{ baseDuration: 3e4, condition: "is_badstart==0&temptation_count==0&order<=3&is_finalcorner==1&corner==0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900271": { alternatives: [{ baseDuration: 24e3, condition: "phase>=2&corner!=0&order_rate>=65&order_rate<=70", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900281": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=45&distance_rate<=60&order>=3&order_rate<=50&hp_per<=70", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900301": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "is_finalcorner==1&order<=4&change_order_onetime<0" }], rarity: 1 }, "900321": { alternatives: [{ baseDuration: 24e3, condition: "distance_rate>=50&corner!=0&order>=3&order_rate<=40", effects: [{ modifier: 150, target: 1, type: 9 }, { modifier: 500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900351": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&order<=5", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "is_finalcorner==1&blocked_side_continuetime>=2" }], rarity: 1 }, "900371": { alternatives: [{ baseDuration: 3e4, condition: "is_badstart==0&temptation_count==0&order>=3&is_finalcorner==1&corner==0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900381": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=50&distance_rate<=65&order>=2&order_rate<=40&change_order_onetime<0", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900391": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&blocked_side_continuetime>=2", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900401": { alternatives: [{ baseDuration: 36e3, condition: "distance_rate>=50&order_rate>=40&order_rate<=70&is_overtake==1", effects: [{ modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900411": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=50&order<=3&blocked_side_continuetime>=2", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900451": { alternatives: [{ baseDuration: 0, condition: "phase_random==1&order>=2&order_rate<=40", effects: [{ modifier: 350, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "900461": { alternatives: [{ baseDuration: 3e4, condition: "phase==1&corner==0&order<=2&bashin_diff_behind<=1", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900501": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&order_rate>=40&order_rate<=75&is_overtake==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900521": { alternatives: [{ baseDuration: 0, condition: "is_finalcorner==1&corner!=0&order_rate>50&near_count>=1", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "900561": { alternatives: [{ baseDuration: 3e4, condition: "phase>=2&order>=3&blocked_front==1", effects: [{ modifier: 1500, target: 1, type: 27 }, { modifier: 500, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900581": { alternatives: [{ baseDuration: 3e4, condition: "phase>=2&corner!=0&order>=3&change_order_onetime<0", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "900601": { alternatives: [{ baseDuration: 3e4, condition: "phase>=2&order==3&bashin_diff_behind<=1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "900611": { alternatives: [{ baseDuration: 3e4, condition: "temptation_count==0&remain_distance<=201&remain_distance>=199&order>=4&order_rate<=70", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "910011": { alternatives: [{ baseDuration: 0, condition: "phase==1&order>=2&order_rate<=70&activate_count_middle>=2", effects: [{ modifier: 150, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "910031": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0", effects: [{ modifier: 2500, target: 1, type: 27 }], precondition: "is_finalcorner==1&is_overtake==1&order<=5&order_rate<=50&overtake_target_no_order_up_time>=2" }], rarity: 1 }, "910041": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=50&activate_count_heal>=1&order<=3", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "910111": { alternatives: [{ baseDuration: 0, condition: "phase==1&change_order_onetime>0&order_rate>=40", effects: [{ modifier: 350, target: 1, type: 9 }], precondition: "" }], rarity: 1 }, "910131": { alternatives: [{ baseDuration: 36e3, condition: "is_finalcorner==1&hp_per<=45&order<=3&order_rate<=50&bashin_diff_behind<=1&overtake_target_time>=1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "910141": { alternatives: [{ baseDuration: 24e3, condition: "is_finalcorner==1&corner!=0&is_overtake==1&order>=4&order_rate<=75", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "910181": { alternatives: [{ baseDuration: 3e4, condition: "phase==1&order>=3&order_rate<=50&is_overtake==1", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 }, "910241": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner!=0&order_rate<=40&change_order_onetime<0", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }, { baseDuration: 24e3, condition: "is_finalcorner==1&corner!=0&order_rate>=50&order_rate<=80&change_order_onetime<0", effects: [{ modifier: 2e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "910301": { alternatives: [{ baseDuration: 0, condition: "phase==1&order>=2&order_rate<=50&overtake_target_time>=1", effects: [{ modifier: 150, target: 1, type: 9 }, { modifier: -25, target: 9, type: 9 }], precondition: "" }], rarity: 1 }, "910451": { alternatives: [{ baseDuration: 3e4, condition: "is_finalcorner==1&corner==0&order<=4&bashin_diff_infront<=1", effects: [{ modifier: 500, target: 1, type: 27 }, { modifier: 1e3, target: 1, type: 31 }], precondition: "" }], rarity: 1 }, "910561": { alternatives: [{ baseDuration: 3e4, condition: "distance_rate>=50&order_rate>=40&overtake_target_time>=2", effects: [{ modifier: 1500, target: 1, type: 27 }], precondition: "" }], rarity: 1 } };

// ../uma-tools/uma-skill-tools/RaceSolverBuilder.ts
var GroundSpeedModifier = Object.freeze([
  null,
  // ground types started at 1
  [0, 0, 0, 0, -50],
  [0, 0, 0, 0, -50]
].map((o) => Object.freeze(o)));
var GroundPowerModifier = Object.freeze([
  null,
  [0, 0, -50, -50, -50],
  [0, -100, -50, -100, -100]
].map((o) => Object.freeze(o)));
var StrategyProficiencyModifier = Object.freeze([1.1, 1, 0.85, 0.75, 0.6, 0.4, 0.2, 0.1]);
var Asitame;
((Asitame2) => {
  Asitame2.StrategyDistanceCoefficient = Object.freeze([
    [],
    // distances are 1-indexed (as are strategies, hence the 0 in the first column for every row)
    [0, 1, 0.7, 0.75, 0.7, 1],
    // short (nige, senkou, sasi, oikomi, oonige)
    [0, 1, 0.8, 0.7, 0.75, 1],
    // mile
    [0, 1, 0.9, 0.875, 0.86, 1],
    // medium
    [0, 1, 0.9, 1, 0.9, 1]
    // long
  ]);
  Asitame2.BaseModifier = 875e-5;
  function calcApproximateModifier(power, strategy, distance) {
    return Asitame2.BaseModifier * Math.sqrt(power - 1200) * Asitame2.StrategyDistanceCoefficient[distance][strategy];
  }
  Asitame2.calcApproximateModifier = calcApproximateModifier;
})(Asitame || (Asitame = {}));
var StaminaSyoubu;
((StaminaSyoubu2) => {
  function distanceFactor(distance) {
    if (distance < 2101)
      return 0;
    else if (distance < 2201)
      return 0.5;
    else if (distance < 2401)
      return 1;
    else if (distance < 2601)
      return 1.2;
    else
      return 1.5;
  }
  StaminaSyoubu2.distanceFactor = distanceFactor;
  function calcApproximateModifier(stamina, distance) {
    const randomFactor = 1;
    return Math.sqrt(stamina - 1200) * 85e-4 * distanceFactor(distance) * randomFactor;
  }
  StaminaSyoubu2.calcApproximateModifier = calcApproximateModifier;
})(StaminaSyoubu || (StaminaSyoubu = {}));
function parseStrategy(s) {
  if (typeof s != "string") {
    return s;
  }
  switch (s.toUpperCase()) {
    case "NIGE":
      return 1 /* Nige */;
    case "SENKOU":
      return 2 /* Senkou */;
    case "SASI":
    case "SASHI":
      return 3 /* Sasi */;
    case "OIKOMI":
      return 4 /* Oikomi */;
    case "OONIGE":
      return 5 /* Oonige */;
    default:
      throw new Error("Invalid running strategy.");
  }
}
function parseAptitude(a, type) {
  if (typeof a != "string") {
    return a;
  }
  switch (a.toUpperCase()) {
    case "S":
      return 0 /* S */;
    case "A":
      return 1 /* A */;
    case "B":
      return 2 /* B */;
    case "C":
      return 3 /* C */;
    case "D":
      return 4 /* D */;
    case "E":
      return 5 /* E */;
    case "F":
      return 6 /* F */;
    case "G":
      return 7 /* G */;
    default:
      throw new Error("Invalid " + type + " aptitude.");
  }
}
function parseGroundCondition(g) {
  if (typeof g != "string") {
    return g;
  }
  switch (g.toUpperCase()) {
    case "GOOD":
      return 1 /* Good */;
    case "YIELDING":
      return 2 /* Yielding */;
    case "SOFT":
      return 3 /* Soft */;
    case "HEAVY":
      return 4 /* Heavy */;
    default:
      throw new Error("Invalid ground condition.");
  }
}
function parseWeather(w) {
  if (typeof w != "string") {
    return w;
  }
  switch (w.toUpperCase()) {
    case "SUNNY":
      return 1 /* Sunny */;
    case "CLOUDY":
      return 2 /* Cloudy */;
    case "RAINY":
      return 3 /* Rainy */;
    case "SNOWY":
      return 4 /* Snowy */;
    default:
      throw new Error("Invalid weather.");
  }
}
function parseSeason(s) {
  if (typeof s != "string") {
    return s;
  }
  switch (s.toUpperCase()) {
    case "SPRING":
      return 1 /* Spring */;
    case "SUMMER":
      return 2 /* Summer */;
    case "AUTUMN":
      return 3 /* Autumn */;
    case "WINTER":
      return 4 /* Winter */;
    case "SAKURA":
      return 5 /* Sakura */;
    default:
      throw new Error("Invalid season.");
  }
}
function parseTime(t) {
  if (typeof t != "string") {
    return t;
  }
  switch (t.toUpperCase()) {
    case "NONE":
    case "NOTIME":
      return 0 /* NoTime */;
    case "MORNING":
      return 1 /* Morning */;
    case "MIDDAY":
      return 2 /* Midday */;
    case "EVENING":
      return 3 /* Evening */;
    case "NIGHT":
      return 4 /* Night */;
    default:
      throw new Error("Invalid race time.");
  }
}
function parseGrade(g) {
  if (typeof g != "string") {
    return g;
  }
  switch (g.toUpperCase()) {
    case "G1":
      return 100 /* G1 */;
    case "G2":
      return 200 /* G2 */;
    case "G3":
      return 300 /* G3 */;
    case "OP":
      return 400 /* OP */;
    case "PRE-OP":
    case "PREOP":
      return 700 /* PreOP */;
    case "MAIDEN":
      return 800 /* Maiden */;
    case "DEBUT":
      return 900 /* Debut */;
    case "DAILY":
      return 999 /* Daily */;
    default:
      throw new Error("Invalid race grade.");
  }
}
function adjustOvercap(stat) {
  return stat > 1200 ? 1200 + Math.floor((stat - 1200) / 2) : stat;
}
function buildBaseStats(horseDesc, mood) {
  const motivCoef = 1 + 0.02 * mood;
  return Object.freeze({
    speed: adjustOvercap(horseDesc.speed) * motivCoef,
    stamina: adjustOvercap(horseDesc.stamina) * motivCoef,
    power: adjustOvercap(horseDesc.power) * motivCoef,
    guts: adjustOvercap(horseDesc.guts) * motivCoef,
    wisdom: adjustOvercap(horseDesc.wisdom) * motivCoef,
    strategy: parseStrategy(horseDesc.strategy),
    distanceAptitude: parseAptitude(horseDesc.distanceAptitude, "distance"),
    surfaceAptitude: parseAptitude(horseDesc.surfaceAptitude, "surface"),
    strategyAptitude: parseAptitude(horseDesc.strategyAptitude, "strategy"),
    rawStamina: horseDesc.stamina * motivCoef
  });
}
function buildAdjustedStats(baseStats, course, ground) {
  const raceCourseModifier = CourseHelpers.courseSpeedModifier(course, baseStats);
  return Object.freeze({
    speed: Math.max(baseStats.speed * raceCourseModifier + GroundSpeedModifier[course.surface][ground], 1),
    stamina: baseStats.stamina,
    power: Math.max(baseStats.power + GroundPowerModifier[course.surface][ground], 1),
    guts: baseStats.guts,
    wisdom: baseStats.wisdom * StrategyProficiencyModifier[baseStats.strategyAptitude],
    strategy: baseStats.strategy,
    distanceAptitude: baseStats.distanceAptitude,
    surfaceAptitude: baseStats.surfaceAptitude,
    strategyAptitude: baseStats.strategyAptitude,
    rawStamina: baseStats.rawStamina
  });
}
function isTarget(self2, targetType) {
  return targetType == 2 /* All */ || self2 == 3 /* Any */ || self2 == 1 /* Self */ == (targetType == 1 /* Self */);
}
function buildSkillEffects(skill, perspective) {
  return skill.effects.reduce((acc, ef) => {
    if (isTarget(perspective, ef.target) && SkillType.hasOwnProperty(ef.type)) {
      acc.push({ type: ef.type, baseDuration: skill.baseDuration / 1e4, modifier: ef.modifier / 1e4 });
    }
    return acc;
  }, []);
}
function buildSkillData(horse, raceParams, course, wholeCourse, parser, skillId, perspective, ignoreNullEffects = false) {
  if (!(skillId in skill_data_default)) {
    throw new Error("bad skill ID " + skillId);
  }
  const extra = Object.assign({ skillId }, raceParams);
  const alternatives = skill_data_default[skillId].alternatives;
  const triggers = [];
  for (let i = 0; i < alternatives.length; ++i) {
    const skill = alternatives[i];
    let full = new RegionList();
    wholeCourse.forEach((r) => full.push(r));
    if (skill.precondition) {
      const pre = parser.parse(parser.tokenize(skill.precondition));
      const preRegions = pre.apply(wholeCourse, course, horse, extra)[0];
      if (preRegions.length == 0) {
        continue;
      } else {
        const bounds = new Region(preRegions[0].start, wholeCourse[wholeCourse.length - 1].end);
        full = full.rmap((r) => r.intersect(bounds));
      }
    }
    const op = parser.parse(parser.tokenize(skill.condition));
    const [regions, extraCondition] = op.apply(full, course, horse, extra);
    if (regions.length == 0) {
      continue;
    }
    if (triggers.length > 0 && !/is_activate_other_skill_detail|is_used_skill_id/.test(skill.condition)) {
      continue;
    }
    const effects2 = buildSkillEffects(skill, perspective);
    if (effects2.length > 0 || ignoreNullEffects) {
      const rarity = skill_data_default[skillId].rarity;
      triggers.push({
        skillId,
        perspective,
        // for some reason 1*/2* uniques, 1*/2* upgraded to 3*, and naturally 3* uniques all have different rarity (3, 4, 5 respectively)
        rarity: rarity >= 3 && rarity <= 5 ? 3 : rarity,
        samplePolicy: op.samplePolicy,
        regions,
        extraCondition,
        effects: effects2
      });
    }
  }
  if (triggers.length > 0)
    return triggers;
  const effects = buildSkillEffects(alternatives[0], perspective);
  if (effects.length == 0 && !ignoreNullEffects) {
    return [];
  } else {
    const rarity = skill_data_default[skillId].rarity;
    const afterEnd = new RegionList();
    afterEnd.push(new Region(9999, 9999));
    return [{
      skillId,
      perspective,
      rarity: rarity >= 3 && rarity <= 5 ? 3 : rarity,
      samplePolicy: ImmediatePolicy,
      regions: afterEnd,
      extraCondition: (_) => false,
      effects
    }];
  }
}
var conditionsWithActivateCountsAsRandom = Object.freeze(Object.assign({}, Conditions, {
  activate_count_all: random({
    filterGte(regions, n, course, _1, extra) {
      if (n == 7) {
        const rl = new RegionList();
        regions.forEach((r) => rl.push(new Region(r.start, r.start + 11)));
        return rl;
      }
      const bounds = new Region(Math.min(n / 23 - 0.2, 0.6) * course.distance, Math.min(n / 23 + 0.2, 1) * course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    },
    filterLte(regions, n, course, _1, extra) {
      return new RegionList();
    }
  }),
  activate_count_end_after: random({
    filterGte(regions, _0, course, _1, extra) {
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, 2), CourseHelpers.phaseEnd(course.distance, 3));
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  activate_count_heal: noopRandom,
  activate_count_later_half: random({
    filterGte(regions, _0, course, _1, extra) {
      const bounds = new Region(course.distance / 2, course.distance);
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  activate_count_middle: random({
    filterGte(regions, n, course, _1, extra) {
      const start = CourseHelpers.phaseStart(course.distance, 1), end = CourseHelpers.phaseEnd(course.distance, 1);
      const bounds = new Region(start, start + n / 10 * (end - start));
      return regions.rmap((r) => r.intersect(bounds));
    }
  }),
  activate_count_start: immediate({
    // for 地固め
    filterGte(regions, _0, course, _1, extra) {
      const bounds = new Region(CourseHelpers.phaseStart(course.distance, 0), CourseHelpers.phaseEnd(course.distance, 0));
      return regions.rmap((r) => r.intersect(bounds));
    }
  })
}));
var defaultParser = getParser();
var acrParser = getParser(conditionsWithActivateCountsAsRandom);
var RaceSolverBuilder = class _RaceSolverBuilder {
  constructor(nsamples) {
    this.nsamples = nsamples;
    this._course = null;
    this._raceParams = {
      mood: 2,
      groundCondition: 1 /* Good */,
      weather: 1 /* Sunny */,
      season: 1 /* Spring */,
      time: 2 /* Midday */,
      grade: 100 /* G1 */,
      popularity: 1
    };
    this._horse = null;
    this._pacer = null;
    this._pacerSkills = [];
    this._rng = new Rule30CARng(Math.floor(Math.random() * (-1 >>> 0)) >>> 0);
    this._parser = defaultParser;
    this._skills = [];
    this._samplePolicyOverride = /* @__PURE__ */ new Map();
    this._extraSkillHooks = [];
    this._onSkillActivate = null;
    this._onSkillDeactivate = null;
  }
  seed(seed) {
    this._rng = new Rule30CARng(seed);
    return this;
  }
  course(course) {
    if (typeof course == "number") {
      this._course = CourseHelpers.getCourse(course);
    } else {
      this._course = course;
    }
    return this;
  }
  mood(mood) {
    this._raceParams.mood = mood;
    return this;
  }
  ground(ground) {
    this._raceParams.groundCondition = parseGroundCondition(ground);
    return this;
  }
  weather(weather) {
    this._raceParams.weather = parseWeather(weather);
    return this;
  }
  season(season) {
    this._raceParams.season = parseSeason(season);
    return this;
  }
  time(time) {
    this._raceParams.time = parseTime(time);
    return this;
  }
  grade(grade) {
    this._raceParams.grade = parseGrade(grade);
    return this;
  }
  popularity(popularity) {
    this._raceParams.popularity = popularity;
    return this;
  }
  order(start, end) {
    this._raceParams.orderRange = [start, end];
    return this;
  }
  numUmas(n) {
    this._raceParams.numUmas = n;
    return this;
  }
  horse(horse) {
    this._horse = horse;
    return this;
  }
  pacer(horse) {
    this._pacer = horse;
    return this;
  }
  _isNige() {
    if (typeof this._horse.strategy == "string") {
      return this._horse.strategy.toUpperCase() == "NIGE" || this._horse.strategy.toUpperCase() == "OONIGE";
    } else {
      return this._horse.strategy == 1 /* Nige */ || this._horse.strategy == 5 /* Oonige */;
    }
  }
  useDefaultPacer(openingLegAccel = true) {
    if (this._isNige()) {
      return this;
    }
    this._pacer = Object.assign({}, this._horse, { strategy: "Nige" });
    if (openingLegAccel) {
      this._pacerSkills = [{
        skillId: "201601",
        perspective: 1 /* Self */,
        rarity: 1 /* White */,
        trigger: new Region(0, 100),
        extraCondition: (_) => true,
        effects: [{ type: 31 /* Accel */, baseDuration: 3, modifier: 0.2 }]
      }, {
        skillId: "200532",
        perspective: 1 /* Self */,
        rarity: 1 /* White */,
        trigger: new Region(0, 100),
        extraCondition: (_) => true,
        effects: [{ type: 31 /* Accel */, baseDuration: 1.2, modifier: 0.2 }]
      }];
    }
    return this;
  }
  withActivateCountsAsRandom() {
    this._parser = acrParser;
    return this;
  }
  // NB. must be called after horse and mood are set
  withAsiwotameru() {
    const baseDisplayedPower = this._horse.power * (1 + 0.02 * this._raceParams.mood);
    this._extraSkillHooks.push((skilldata, horse, course) => {
      const power = skilldata.reduce((acc, sd) => {
        const powerUp = sd.effects.find((ef) => ef.type == 3 /* PowerUp */);
        if (powerUp && sd.regions.length > 0 && sd.regions[0].start < 9999) {
          return acc + powerUp.modifier;
        } else {
          return acc;
        }
      }, baseDisplayedPower);
      if (power > 1200) {
        const spurtStart = new RegionList();
        spurtStart.push(new Region(CourseHelpers.phaseStart(course.distance, 2), course.distance));
        skilldata.push({
          skillId: "asitame",
          perspective: 1 /* Self */,
          rarity: 1 /* White */,
          regions: spurtStart,
          samplePolicy: ImmediatePolicy,
          extraCondition: (_) => true,
          effects: [{
            type: 31 /* Accel */,
            baseDuration: 3 / (course.distance / 1e3),
            modifier: Asitame.calcApproximateModifier(power, horse.strategy, course.distanceType)
          }]
        });
      }
    });
    return this;
  }
  withStaminaSyoubu() {
    this._extraSkillHooks.push((skilldata, horse, course) => {
      const stamina = skilldata.reduce((acc, sd) => {
        const staminaUp = sd.effects.find((ef) => ef.type == 2 /* StaminaUp */);
        if (staminaUp && sd.regions.length > 0 && sd.regions[0].start < 9999) {
          return acc + staminaUp.modifier;
        } else {
          return acc;
        }
      }, horse.rawStamina);
      if (stamina > 1200) {
        const spurtStart = new RegionList();
        spurtStart.push(new Region(CourseHelpers.phaseStart(course.distance, 2), course.distance));
        skilldata.push({
          skillId: "staminasyoubu",
          perspective: 1 /* Self */,
          rarity: 1 /* White */,
          regions: spurtStart,
          samplePolicy: ImmediatePolicy,
          // TODO do current speed skills count toward reaching max speed or not?
          extraCondition: (s) => s.currentSpeed >= s.lastSpurtSpeed,
          effects: [{
            type: 27 /* TargetSpeed */,
            baseDuration: 9999,
            modifier: StaminaSyoubu.calcApproximateModifier(stamina, course.distance)
          }]
        });
      }
    });
    return this;
  }
  addSkill(skillId, perspective = 1 /* Self */, samplePolicy) {
    this._skills.push({ id: skillId, p: perspective });
    if (samplePolicy != null) {
      this._samplePolicyOverride.set(skillId, samplePolicy);
    }
    return this;
  }
  onSkillActivate(cb) {
    this._onSkillActivate = cb;
    return this;
  }
  onSkillDeactivate(cb) {
    this._onSkillDeactivate = cb;
    return this;
  }
  fork() {
    const clone = new _RaceSolverBuilder(this.nsamples);
    clone._course = this._course;
    clone._raceParams = Object.assign({}, this._raceParams);
    clone._horse = this._horse;
    clone._pacer = this._pacer;
    clone._pacerSkills = this._pacerSkills.slice();
    clone._rng = new Rule30CARng(this._rng.lo, this._rng.hi);
    clone._parser = this._parser;
    clone._skills = this._skills.slice();
    clone._onSkillActivate = this._onSkillActivate;
    clone._onSkillDeactivate = this._onSkillDeactivate;
    clone._extraSkillHooks = this._extraSkillHooks.slice();
    return clone;
  }
  *build() {
    let horse = buildBaseStats(this._horse, this._raceParams.mood);
    let solverRng = new Rule30CARng(this._rng.int32());
    let pacerRng = new Rule30CARng(this._rng.int32());
    const pacerHorse = this._pacer ? buildAdjustedStats(buildBaseStats(this._pacer, this._raceParams.mood), this._course, this._raceParams.groundCondition) : null;
    const wholeCourse = new RegionList();
    wholeCourse.push(new Region(0, this._course.distance));
    Object.freeze(wholeCourse);
    const makeSkill = buildSkillData.bind(null, horse, this._raceParams, this._course, wholeCourse, this._parser);
    const skilldata = this._skills.flatMap(({ id, p }) => makeSkill(id, p));
    this._extraSkillHooks.forEach((h) => h(skilldata, horse, this._course));
    const triggers = skilldata.map((sd) => {
      const sp = this._samplePolicyOverride.get(sd.skillId) || sd.samplePolicy;
      return sp.sample(sd.regions, this.nsamples, this._rng);
    });
    horse = buildAdjustedStats(horse, this._course, this._raceParams.groundCondition);
    for (let i = 0; i < this.nsamples; ++i) {
      const skills = skilldata.map((sd, sdi) => ({
        skillId: sd.skillId,
        perspective: sd.perspective,
        rarity: sd.rarity,
        trigger: triggers[sdi][i % triggers[sdi].length],
        extraCondition: sd.extraCondition,
        effects: sd.effects
      }));
      const backupPacerRng = new Rule30CARng(pacerRng.lo, pacerRng.hi);
      const backupSolverRng = new Rule30CARng(solverRng.lo, solverRng.hi);
      const pacer = pacerHorse ? new RaceSolver({
        horse: pacerHorse,
        course: this._course,
        hp: NoopHpPolicy,
        skills: this._pacerSkills,
        rng: pacerRng
      }) : null;
      const redo = yield new RaceSolver({
        horse,
        course: this._course,
        skills,
        pacer,
        hp: new GameHpPolicy(this._course, this._raceParams.groundCondition, new Rule30CARng(solverRng.int32())),
        rng: solverRng,
        onSkillActivate: this._onSkillActivate,
        onSkillDeactivate: this._onSkillDeactivate
      });
      if (redo) {
        --i;
        pacerRng = backupPacerRng;
        solverRng = backupSolverRng;
      }
    }
  }
};

// ../uma-tools/umalator/compare.ts
function runComparison(nsamples, course, racedef, uma1, uma2, options) {
  const standard = new RaceSolverBuilder(nsamples).seed(options.seed).course(course).mood(racedef.mood).ground(racedef.groundCondition).weather(racedef.weather).season(racedef.season).time(racedef.time);
  if (racedef.orderRange != null) {
    standard.order(racedef.orderRange[0], racedef.orderRange[1]).numUmas(racedef.numUmas);
  }
  const compare = standard.fork();
  const uma1_ = uma1.update("skills", (sk) => Array.from(sk.values())).toJS();
  const uma2_ = uma2.update("skills", (sk) => Array.from(sk.values())).toJS();
  standard.horse(uma1_);
  compare.horse(uma2_);
  const common = uma1.skills.keySeq().toSet().intersect(uma2.skills.keySeq().toSet()).toArray().sort((a2, b2) => +a2 - +b2);
  const commonIdx = (id) => {
    let i = common.indexOf(skill_meta_default[id].groupId);
    return i > -1 ? i : common.length;
  };
  const sort = (a2, b2) => commonIdx(a2) - commonIdx(b2) || +a2 - +b2;
  uma1_.skills.sort(sort).forEach((id) => {
    standard.addSkill(id, 1 /* Self */);
    compare.addSkill(id, 2 /* Other */);
  });
  uma2_.skills.sort(sort).forEach((id) => {
    compare.addSkill(id, 1 /* Self */);
    standard.addSkill(id, 2 /* Other */);
  });
  if (true) {
    standard.withAsiwotameru().withStaminaSyoubu();
    compare.withAsiwotameru().withStaminaSyoubu();
  }
  if (options.usePosKeep) {
    standard.useDefaultPacer();
    compare.useDefaultPacer();
  }
  const skillPos1 = /* @__PURE__ */ new Map(), skillPos2 = /* @__PURE__ */ new Map();
  function getActivator(selfSet, otherSet) {
    return function(s, id, persp) {
      const skillSet = persp == 1 /* Self */ ? selfSet : otherSet;
      if (id != "asitame" && id != "staminasyoubu") {
        if (!skillSet.has(id))
          skillSet.set(id, []);
        skillSet.get(id).push([s.pos, -1]);
      }
    };
  }
  function getDeactivator(selfSet, otherSet) {
    return function(s, id, persp) {
      const skillSet = persp == 1 /* Self */ ? selfSet : otherSet;
      if (id != "asitame" && id != "staminasyoubu") {
        const ar = skillSet.get(id);
        const r = ar.find((x) => x[1] == -1);
        if (r != null)
          r[1] = Math.min(s.pos, course.distance);
      }
    };
  }
  standard.onSkillActivate(getActivator(skillPos1, skillPos2));
  standard.onSkillDeactivate(getDeactivator(skillPos1, skillPos2));
  compare.onSkillActivate(getActivator(skillPos2, skillPos1));
  compare.onSkillDeactivate(getDeactivator(skillPos2, skillPos1));
  let a = standard.build(), b = compare.build();
  let ai = 1, bi = 0;
  let sign = 1;
  const diff = [];
  let min = Infinity, max = -Infinity, estMean, estMedian, bestMeanDiff = Infinity, bestMedianDiff = Infinity;
  let minrun, maxrun, meanrun, medianrun;
  const sampleCutoff = Math.max(Math.floor(nsamples * 0.8), nsamples - 200);
  let retry = false;
  for (let i = 0; i < nsamples; ++i) {
    const s1 = a.next(retry).value;
    const s2 = b.next(retry).value;
    const data = { t: [[], []], p: [[], []], v: [[], []], hp: [[], []], sk: [null, null], sdly: [0, 0] };
    while (s2.pos < course.distance) {
      s2.step(1 / 15);
      data.t[ai].push(s2.accumulatetime.t);
      data.p[ai].push(s2.pos);
      data.v[ai].push(s2.currentSpeed + (s2.modifiers.currentSpeed.acc + s2.modifiers.currentSpeed.err));
      data.hp[ai].push(s2.hp.hp);
    }
    data.sdly[ai] = s2.startDelay;
    while (s1.accumulatetime.t < s2.accumulatetime.t) {
      s1.step(1 / 15);
      data.t[bi].push(s1.accumulatetime.t);
      data.p[bi].push(s1.pos);
      data.v[bi].push(s1.currentSpeed + (s1.modifiers.currentSpeed.acc + s1.modifiers.currentSpeed.err));
      data.hp[bi].push(s1.hp.hp);
    }
    const pos1 = s1.pos;
    while (s1.pos < course.distance) {
      s1.step(1 / 15);
      data.t[bi].push(s1.accumulatetime.t);
      data.p[bi].push(s1.pos);
      data.v[bi].push(s1.currentSpeed + (s1.modifiers.currentSpeed.acc + s1.modifiers.currentSpeed.err));
      data.hp[bi].push(s1.hp.hp);
    }
    data.sdly[bi] = s1.startDelay;
    s2.cleanup();
    s1.cleanup();
    data.sk[1] = new Map(skillPos2);
    skillPos2.clear();
    data.sk[0] = new Map(skillPos1);
    skillPos1.clear();
    if (s2.pos < pos1 || isNaN(pos1)) {
      [b, a] = [a, b];
      [bi, ai] = [ai, bi];
      sign *= -1;
      --i;
      retry = true;
    } else {
      retry = false;
      const basinn = sign * (s2.pos - pos1) / 2.5;
      diff.push(basinn);
      if (basinn < min) {
        min = basinn;
        minrun = data;
      }
      if (basinn > max) {
        max = basinn;
        maxrun = data;
      }
      if (i == sampleCutoff) {
        diff.sort((a2, b2) => a2 - b2);
        estMean = diff.reduce((a2, b2) => a2 + b2) / diff.length;
        const mid = Math.floor(diff.length / 2);
        estMedian = mid > 0 && diff.length % 2 == 0 ? (diff[mid - 1] + diff[mid]) / 2 : diff[mid];
      }
      if (i >= sampleCutoff) {
        const meanDiff = Math.abs(basinn - estMean), medianDiff = Math.abs(basinn - estMedian);
        if (meanDiff < bestMeanDiff) {
          bestMeanDiff = meanDiff;
          meanrun = data;
        }
        if (medianDiff < bestMedianDiff) {
          bestMedianDiff = medianDiff;
          medianrun = data;
        }
      }
    }
  }
  diff.sort((a2, b2) => a2 - b2);
  return { results: diff, runData: { minrun, maxrun, meanrun, medianrun } };
}

// simulation.worker.ts
function convertSkillsToArray(skills) {
  if (Array.isArray(skills)) {
    return skills;
  }
  if (skills && typeof skills === "object") {
    return Object.values(skills);
  }
  return [];
}
function runSkillSimulation(task) {
  const results = [];
  const baseSkillIds = convertSkillsToArray(task.baseUma.skills);
  const skillIdsWithNewSkill = [...baseSkillIds];
  const newSkillGroupId = skill_meta_default[task.skillId].groupId;
  const filteredSkillIds = skillIdsWithNewSkill.filter((id) => skill_meta_default[id]?.groupId !== newSkillGroupId);
  filteredSkillIds.push(task.skillId);
  if (task.useRandomMood) {
    const moods = [-2, -1, 0, 1, 2];
    for (let i = 0; i < task.numSimulations; i++) {
      const mood = moods[i % moods.length];
      const baseUma = new HorseState({ ...task.baseUma, mood }).set("skills", SkillSet(baseSkillIds));
      const umaWithSkill = new HorseState({ ...task.baseUma, mood }).set(
        "skills",
        SkillSet(filteredSkillIds)
      );
      const singleSimOptions = { ...task.simOptions };
      if (singleSimOptions.seed !== void 0 && singleSimOptions.seed !== null) {
        singleSimOptions.seed = singleSimOptions.seed + i;
      }
      const { results: singleResults } = runComparison(
        1,
        task.course,
        task.racedef,
        baseUma,
        umaWithSkill,
        singleSimOptions
      );
      results.push(singleResults[0]);
    }
  } else {
    const baseUma = new HorseState(task.baseUma).set("skills", SkillSet(baseSkillIds));
    const umaWithSkill = new HorseState(task.baseUma).set("skills", SkillSet(filteredSkillIds));
    const { results: batchResults } = runComparison(
      task.numSimulations,
      task.course,
      task.racedef,
      baseUma,
      umaWithSkill,
      task.simOptions
    );
    results.push(...batchResults);
  }
  results.sort((a, b) => a - b);
  const mean = results.reduce((a, b) => a + b, 0) / results.length;
  const min = results[0];
  const max = results[results.length - 1];
  const mid = Math.floor(results.length / 2);
  const median = results.length % 2 === 0 ? (results[mid - 1] + results[mid]) / 2 : results[mid];
  const ciPercent = task.confidenceInterval ?? 95;
  const lowerPercentile = (100 - ciPercent) / 2;
  const upperPercentile = 100 - lowerPercentile;
  const lower_Index = Math.floor(results.length * (lowerPercentile / 100));
  const upper_Index = Math.floor(results.length * (upperPercentile / 100));
  const ciLower = results[lower_Index];
  const ciUpper = results[upper_Index];
  if (task.returnRawResults) {
    return {
      skillName: task.skillName,
      rawResults: results
    };
  }
  return {
    skillName: task.skillName,
    mean,
    median,
    min,
    max,
    ciLower,
    ciUpper
  };
}
if (import_worker_threads.parentPort && import_worker_threads.workerData) {
  try {
    const result = runSkillSimulation(import_worker_threads.workerData);
    import_worker_threads.parentPort.postMessage({ success: true, result });
  } catch (error) {
    import_worker_threads.parentPort.postMessage({ success: false, error: String(error) });
  }
}
/*! Bundled license information:

immutable/dist/immutable.js:
  (**
   * @license
   * MIT License
   * 
   * Copyright (c) 2014-present, Lee Byron and other contributors.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *)
*/
