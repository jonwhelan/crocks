/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const VERSION = 1

const _equals = require('./equals')
const _implements = require('./implements')
const _inspect = require('./inspect')
const type = require('./types').type('List')
const _type = require('./types').typeFn(type(), VERSION)

const array = require('./array')

const isApply = require('./isApply')
const isArray = require('./isArray')
const isEmpty = require('./isEmpty')
const isFunction = require('./isFunction')
const isSameType = require('./isSameType')
const isSemigroup = require('./isSemigroup')
const predOrFunc = require('./predOrFunc')

const not =
  fn => x => !fn(x)

const _prepend =
  x => m => x.concat(m)

const { Nothing, Just } = require('./Maybe')

const Pred = require('./types').proxy('Pred')

const _of =
  x => List([ x ])

const _empty =
  () => List([])

function fromArray(xs) {
  if(!isArray(xs)) {
    throw new TypeError('List.fromArray: Array required')
  }
  return xs.reduce((res, x) => res.concat(List.of(x)), List.empty())
}

function applyTraverse(x, y) {
  if(isArray(x)) {
    return array.ap(x, array.map(v => _prepend(List.of(v)), y))
  }

  return y
    .map(v => _prepend(List.of(v)))
    .ap(x)
}

function runSequence(acc, x) {
  if(!((isApply(acc) || isArray(acc)) && isSameType(acc, x))) {
    throw new TypeError('List.sequence: Must wrap Applicatives')
  }

  return applyTraverse(acc, x)
}

function runTraverse(f) {
  return function(acc, x) {
    const m = f(x)

    if(!((isApply(acc) || isArray(acc)) && isSameType(acc, m))) {
      throw new TypeError('List.traverse: Both functions must return an Applicative')
    }

    return applyTraverse(acc, m)
  }
}

function List(x) {
  if(!arguments.length) {
    throw new TypeError('List: List must wrap something')
  }

  const xs = isArray(x) ? x.slice() : [ x ]

  function flatMap(fn) {
    return function(y, x) {
      const m = fn(x)

      if(!isSameType(List, m)) {
        throw new TypeError('List.chain: Function must return a List')
      }

      return y.concat(m.valueOf())
    }
  }

  const of =
    _of

  const valueOf =
    () => xs.slice()

  const toArray =
    valueOf

  const empty =
    _empty

  const inspect =
    () => `List${_inspect(xs)}`

  const head =
    () => xs.length
      ? Just(xs[0])
      : Nothing()

  const tail =
    () => xs.length && xs.length > 1
      ? Just(List(xs.slice(1)))
      : Nothing()

  const cons =
    x => List([ x ].concat(xs))

  const equals = m =>
    isSameType(List, m)
      && _equals(xs, m.valueOf())

  function concat(m) {
    if(!isSameType(List, m)) {
      throw new TypeError('List.concat: List required')
    }

    return List(xs.concat(m.valueOf()))
  }

  function reduce(fn, i) {
    if(!isFunction(fn)) {
      throw new TypeError('List.reduce: Function required for first argument')
    }

    return xs.reduce(fn, i)
  }

  function reduceRight(fn, i) {
    if(!isFunction(fn)) {
      throw new TypeError('List.reduceRight: Function required for first argument')
    }

    return xs.reduceRight(fn, i)
  }

  function fold() {
    if(isEmpty(xs)) {
      throw new TypeError('List.fold: List must contain at least one Semigroup')
    }
    if(xs.length === 1) {
      if(!isSemigroup(xs[0])) {
        throw new TypeError('List.fold: List must contain Semigroups of the same type')
      }
      return xs[0]
    }
    return xs.reduce(function(x, y) {
      if(!(isSemigroup(x) && isSameType(x, y))) {
        throw new TypeError('List.fold: List must contain Semigroups of the same type')
      }
      return x.concat(y)
    })
  }

  function filter(pred) {
    if(!(isFunction(pred) || isSameType(Pred, pred))) {
      throw new TypeError('List.filter: Pred or predicate function required')
    }

    return reduce(
      (x, y) => predOrFunc(pred, y) ? x.concat(x.of(y)) : x,
      empty()
    )
  }

  function reject(pred) {
    if(!(isFunction(pred) || isSameType(Pred, pred))) {
      throw new TypeError('List.reject: Pred or predicate function required')
    }

    const fn = not(x => predOrFunc(pred, x))

    return reduce(
      (x, y) => fn(y) ? x.concat(x.of(y)) : x,
      empty()
    )
  }

  function map(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('List.map: Function required')
    }

    return List(xs.map(x => fn(x)))
  }

  function ap(m) {
    const allFuncs =
      xs.reduce((b, i) => b && isFunction(i), true)

    if(!allFuncs) {
      throw new TypeError('List.ap: Wrapped values must all be functions')
    }
    else if(!isSameType(List, m)) {
      throw new TypeError('List.ap: List required')
    }

    return chain(fn => m.map(fn))
  }

  function chain(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('List.chain: Function required')
    }

    return List(xs.reduce(flatMap(fn), []))
  }

  function sequence(af) {
    if(!isFunction(af)) {
      throw new TypeError('List.sequence: Applicative Function required')
    }

    return reduceRight(
      runSequence,
      af(List.empty())
    )
  }

  function traverse(af, f) {
    if(!isFunction(f) || !isFunction(af)) {
      throw new TypeError('List.traverse: Applicative returning functions required for both arguments')
    }

    return reduceRight(
      runTraverse(f),
      af(List.empty())
    )
  }

  return {
    inspect, toString: inspect, valueOf, toArray,
    head, tail, cons, type, equals, concat, empty,
    reduce, reduceRight, fold, filter, reject, map,
    ap, of, chain, sequence, traverse,
    'fantasy-land/of': of,
    'fantasy-land/equals': equals,
    'fantasy-land/concat': concat,
    'fantasy-land/empty': empty,
    'fantasy-land/map': map,
    'fantasy-land/chain': chain,
    'fantasy-land/reduce': reduce,
    '@@type': _type,
    constructor: List
  }
}

List.of = _of
List.empty = _empty
List.type = type

List['fantasy-land/of'] = _of
List['fantasy-land/empty'] = _empty
List['@@type'] = _type

List.fromArray =
  fromArray

List['@@implements'] = _implements(
  [ 'ap', 'chain', 'concat', 'empty', 'equals', 'map', 'of', 'reduce', 'traverse' ]
)

module.exports = List
