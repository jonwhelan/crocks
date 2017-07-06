const test = require('tape')
const crocks = require('./index')

// combinators
const applyTo = require('./applyTo')
const composeB = require('./composeB')
const constant = require('./constant')
const flip = require('./flip')
const identity = require('./identity')
const reverseApply = require('./reverseApply')
const substitution = require('./substitution')

// crocks
const Arrow = require('./Arrow')
const Async = require('./Async')
const Const = require('./Const')
const Either = require('./Either')
const Identity = require('./Identity')
const IO = require('./IO')
const List = require('./List')
const Maybe = require('./Maybe')
const Pair = require('./Pair')
const Pred = require('./Pred')
const Result = require('./Result')
const Reader = require('./Reader')
const Star = require('./Star')
const State = require('./State')
const Unit = require('./Unit')
const Writer = require('./Writer')

// helpers
const assign = require('./assign')
const assoc = require('./assoc')
const binary = require('./binary')
const branch = require('./branch')
const compose = require('./compose')
const composeK = require('./composeK')
const composeP = require('./composeP')
const composeS = require('./composeS')
const curry = require('./curry')
const defaultProps  = require('./defaultProps')
const defaultTo  = require('./defaultTo')
const dissoc = require('./dissoc')
const fanout = require('./fanout')
const fromPairs = require('./fromPairs')
const liftA2 = require('./liftA2')
const liftA3 = require('./liftA3')
const mconcat = require('./mconcat')
const mconcatMap = require('./mconcatMap')
const mreduce = require('./mreduce')
const mreduceMap = require('./mreduceMap')
const nAry = require('./nAry')
const objOf = require('./objOf')
const omit = require('./omit')
const once = require('./once')
const partial = require('./partial')
const pick = require('./pick')
const pipe = require('./pipe')
const pipeK = require('./pipeK')
const pipeP = require('./pipeP')
const pipeS = require('./pipeS')
const prop = require('./prop')
const propPath = require('./propPath')
const safe = require('./safe')
const safeLift = require('./safeLift')
const tap = require('./tap')
const toPairs = require('./toPairs')
const tryCatch = require('./tryCatch')
const unary = require('./unary')
const unit = require('./unit')

// logic
const and = require('./and')
const ifElse = require('./ifElse')
const not = require('./not')
const or = require('./or')
const unless = require('./unless')
const when = require('./when')

// monoids
const All = require('./All')
const Any = require('./Any')
const Assign = require('./Assign')
const Endo = require('./Endo')
const First = require('./First')
const Last = require('./Last')
const Max = require('./Max')
const Min = require('./Min')
const Prod = require('./Prod')
const Sum = require('./Sum')

// pointfree
const alt = require('./alt')
const ap = require('./ap')
const bimap = require('./bimap')
const both = require('./both')
const chain = require('./chain')
const coalesce = require('./coalesce')
const concat = require('./concat')
const cons = require('./cons')
const contramap = require('./contramap')
const either = require('./either')
const empty = require('./empty')
const evalWith = require('./evalWith')
const execWith = require('./execWith')
const extend = require('./extend')
const filter = require('./filter')
const first = require('./first')
const fold = require('./fold')
const fst = require('./fst')
const head = require('./head')
const log = require('./log')
const map = require('./map')
const merge = require('./merge')
const option = require('./option')
const promap = require('./promap')
const read = require('./read')
const reduce = require('./reduce')
const reject = require('./reject')
const run = require('./run')
const runWith = require('./runWith')
const second = require('./second')
const sequence = require('./sequence')
const snd = require('./snd')
const swap = require('./swap')
const tail = require('./tail')
const traverse = require('./traverse')
const value = require('./value')

// predicates
const hasProp = require('./hasProp')
const isAlt = require('./isAlt')
const isAlternative = require('./isAlternative')
const isApplicative = require('./isApplicative')
const isApply = require('./isApply')
const isArray = require('./isArray')
const isBifunctor = require('./isBifunctor')
const isBoolean = require('./isBoolean')
const isCategory = require('./isCategory')
const isChain = require('./isChain')
const isContravariant = require('./isContravariant')
const isDefined = require('./isDefined')
const isEmpty = require('./isEmpty')
const isExtend = require('./isExtend')
const isFoldable = require('./isFoldable')
const isFunction = require('./isFunction')
const isFunctor = require('./isFunctor')
const isInteger = require('./isInteger')
const isMonad = require('./isMonad')
const isMonoid = require('./isMonoid')
const isNil = require('./isNil')
const isNumber = require('./isNumber')
const isObject = require('./isObject')
const isPlus = require('./isPlus')
const isProfunctor = require('./isProfunctor')
const isPromise = require('./isPromise')
const isSameType = require('./isSameType')
const isSemigroup = require('./isSemigroup')
const isSemigroupoid = require('./isSemigroupoid')
const isSetoid = require('./isSetoid')
const isString = require('./isString')
const isTraversable = require('./isTraversable')

// transforms
const arrayToList = require('./arrayToList')
const eitherToAsync = require('./eitherToAsync')
const eitherToFirst = require('./eitherToFirst')
const eitherToLast = require('./eitherToLast')
const eitherToMaybe = require('./eitherToMaybe')
const eitherToResult = require('./eitherToResult')
const firstToAsync = require('./firstToAsync')
const firstToEither = require('./firstToEither')
const firstToLast = require('./firstToLast')
const firstToMaybe = require('./firstToMaybe')
const firstToResult = require('./firstToResult')
const lastToAsync = require('./lastToAsync')
const lastToEither = require('./lastToEither')
const lastToFirst = require('./lastToFirst')
const lastToMaybe = require('./lastToMaybe')
const lastToResult = require('./lastToResult')
const listToArray = require('./listToArray')
const maybeToAsync = require('./maybeToAsync')
const maybeToEither = require('./maybeToEither')
const maybeToFirst = require('./maybeToFirst')
const maybeToLast = require('./maybeToLast')
const maybeToResult = require('./maybeToResult')
const resultToAsync = require('./resultToAsync')
const resultToEither = require('./resultToEither')
const resultToFirst = require('./resultToFirst')
const resultToLast = require('./resultToLast')
const resultToMaybe = require('./resultToMaybe')

test('entry', t => {
  t.equal(crocks.toString(), '[object Object]', 'is an object')

  // combinators
  t.equal(crocks.applyTo, applyTo, 'provides the A combinator (applyTo)')
  t.equal(crocks.composeB, composeB, 'provides the B combinator (composeB)')
  t.equal(crocks.constant, constant, 'provides the K combinator (constant)')
  t.equal(crocks.flip, flip, 'provides the C combinator (flip)')
  t.equal(crocks.identity, identity, 'provides the I combinator (identity)')
  t.equal(crocks.reverseApply, reverseApply, 'provides the T combinator (reverseApply)')
  t.equal(crocks.substitution, substitution, 'provides the S combinator (substitution)')

  // crocks
  t.equal(crocks.Arrow, Arrow, 'provides the Arrow crock')
  t.equal(crocks.Async, Async, 'provides the Async crock')
  t.equal(crocks.Const, Const, 'provides the Const crock')
  t.equal(crocks.Either, Either, 'provides the Either crock')
  t.equal(crocks.Identity, Identity, 'provides the Identity crock')
  t.equal(crocks.IO, IO, 'provides the IO crock')
  t.equal(crocks.List, List, 'provides the List crock')
  t.equal(crocks.Maybe, Maybe, 'provides the Maybe crock')
  t.equal(crocks.Pair, Pair, 'provides the Pair crock')
  t.equal(crocks.Pred, Pred, 'provides the Pred crock')
  t.equal(crocks.Result, Result, 'provides the Result crock')
  t.equal(crocks.Reader, Reader, 'provides the Reader crock')
  t.equal(crocks.Star, Star, 'provides the Star crock')
  t.equal(crocks.State, State, 'provides the State crock')
  t.equal(crocks.Unit, Unit, 'provides the Unit crock')
  t.equal(crocks.Writer, Writer, 'provides the Writer crock')

  // helpers
  t.equal(crocks.assign, assign, 'provides the assign helper')
  t.equal(crocks.assoc, assoc, 'provides the assoc helper')
  t.equal(crocks.binary, binary, 'provides the binary helper')
  t.equal(crocks.branch, branch, 'provides the branch helper')
  t.equal(crocks.compose, compose, 'provides the compose helper')
  t.equal(crocks.composeK, composeK, 'provides the composeK helper')
  t.equal(crocks.composeP, composeP, 'provides the composeP helper')
  t.equal(crocks.composeS, composeS, 'provides the composeS helper')
  t.equal(crocks.curry, curry, 'provides the curry helper')
  t.equal(crocks.defaultProps, defaultProps, 'provides the defaultProps helper')
  t.equal(crocks.defaultTo, defaultTo, 'provides the defaultTo helper')
  t.equal(crocks.dissoc, dissoc, 'provides the dissoc helper')
  t.equal(crocks.fanout, fanout, 'provides the fanout helper')
  t.equal(crocks.fromPairs, fromPairs, 'provides the fromPairs helper')
  t.equal(crocks.liftA2, liftA2, 'provides the liftA2 helper')
  t.equal(crocks.liftA3, liftA3, 'provides the liftA3 helper')
  t.equal(crocks.mconcat, mconcat, 'provides the mconcat helper')
  t.equal(crocks.mconcatMap, mconcatMap, 'provides the mconcatMap helper')
  t.equal(crocks.mreduce, mreduce, 'provides the mreduce helper')
  t.equal(crocks.mreduceMap, mreduceMap, 'provides the mreduceMap helper')
  t.equal(crocks.nAry, nAry, 'provides the nAry helper')
  t.equal(crocks.objOf, objOf, 'provides the objOf helper')
  t.equal(crocks.omit, omit, 'provides the omit helper')
  t.equal(crocks.once, once, 'provides the once helper')
  t.equal(crocks.partial, partial, 'provides the partial helper')
  t.equal(crocks.pick, pick, 'provides the pick helper')
  t.equal(crocks.pipe, pipe, 'provides the pipe helper')
  t.equal(crocks.pipeK, pipeK, 'provides the pipeK helper')
  t.equal(crocks.pipeP, pipeP, 'provides the pipeP helper')
  t.equal(crocks.pipeS, pipeS, 'provides the pipeS helper')
  t.equal(crocks.prop, prop, 'provides the prop helper')
  t.equal(crocks.propPath, propPath, 'provides the propPath helper')
  t.equal(crocks.safe, safe, 'provides the safe helper')
  t.equal(crocks.safeLift, safeLift, 'provides the safeLift helper')
  t.equal(crocks.tap, tap, 'provides the tap helper')
  t.equal(crocks.toPairs, toPairs, 'provides the toPairs helper')
  t.equal(crocks.tryCatch, tryCatch, 'provides the tryCatch helper')
  t.equal(crocks.unary, unary, 'provides the unary helper')
  t.equal(crocks.unit, unit, 'provides the unit helper')

  // logic
  t.equal(crocks.and, and, 'provides the and logic')
  t.equal(crocks.ifElse, ifElse, 'provides the ifElse logic')
  t.equal(crocks.not, not, 'provides the not logic')
  t.equal(crocks.or, or, 'provides the or logic')
  t.equal(crocks.unless, unless, 'provides the unless logic')
  t.equal(crocks.when, when, 'provides the when logic')

  // monoids
  t.equal(crocks.All, All, 'provides the All monoid')
  t.equal(crocks.Any, Any, 'provides the Any monoid')
  t.equal(crocks.Assign, Assign, 'provides the Assign monoid')
  t.equal(crocks.Endo, Endo, 'provides the Endo monoid')
  t.equal(crocks.First, First, 'provides the First monoid')
  t.equal(crocks.Last, Last, 'provides the Last monoid')
  t.equal(crocks.Max, Max, 'provides the Max monoid')
  t.equal(crocks.Min, Min, 'provides the Min monoid')
  t.equal(crocks.Prod, Prod, 'provides the Prod monoid')
  t.equal(crocks.Sum, Sum, 'provides the Sum monoid')

  // pointfree
  t.equal(crocks.alt, alt, 'provides the alt pointfree')
  t.equal(crocks.ap, ap, 'provides the ap pointfree')
  t.equal(crocks.bimap, bimap, 'provides the bimap pointfree')
  t.equal(crocks.both, both, 'provides the both pointfree')
  t.equal(crocks.chain, chain, 'provides the chain pointfree')
  t.equal(crocks.coalesce, coalesce, 'provides the coalesce pointfree')
  t.equal(crocks.concat, concat, 'provides the concat pointfree')
  t.equal(crocks.cons, cons, 'provides the cons pointfree')
  t.equal(crocks.contramap, contramap, 'provides the contramap pointfree')
  t.equal(crocks.either, either, 'provides the either pointfree')
  t.equal(crocks.empty, empty, 'provides the empty pointfree')
  t.equal(crocks.evalWith, evalWith, 'provides the evalWith pointfree')
  t.equal(crocks.execWith, execWith, 'provides the execWith pointfree')
  t.equal(crocks.extend, extend, 'provides the extend pointfree')
  t.equal(crocks.filter, filter, 'provides the filter pointfree')
  t.equal(crocks.first, first, 'provides the first pointfree')
  t.equal(crocks.fold, fold, 'provides the fold pointfree')
  t.equal(crocks.fst, fst, 'provides the fst pointfree')
  t.equal(crocks.head, head, 'provides the head pointfree')
  t.equal(crocks.log, log, 'provides the log pointfree')
  t.equal(crocks.map, map, 'provides the map pointfree')
  t.equal(crocks.merge, merge, 'provides the merge pointfree')
  t.equal(crocks.option, option, 'provides the option pointfree')
  t.equal(crocks.promap, promap, 'provides the promap pointfree')
  t.equal(crocks.read, read, 'provides the read pointfree')
  t.equal(crocks.reduce, reduce, 'provides the reduce pointfree')
  t.equal(crocks.reject, reject, 'provides the reject pointfree')
  t.equal(crocks.run, run, 'provides the run pointfree')
  t.equal(crocks.runWith, runWith, 'provides the runWith pointfree')
  t.equal(crocks.second, second, 'provides the second pointfree')
  t.equal(crocks.sequence, sequence, 'provides the sequence pointfree')
  t.equal(crocks.snd, snd, 'provides the snd pointfree')
  t.equal(crocks.swap, swap, 'provides the swap pointfree')
  t.equal(crocks.tail, tail, 'provides the tail pointfree')
  t.equal(crocks.traverse, traverse, 'provides the traverse pointfree')
  t.equal(crocks.value, value, 'provides the value pointfree')

  // predicates
  t.equal(crocks.hasProp, hasProp, 'provides the hasProp predicate')
  t.equal(crocks.isAlt, isAlt, 'provides the isAlt predicate')
  t.equal(crocks.isAlternative, isAlternative, 'provides the isAlternative predicate')
  t.equal(crocks.isApply, isApply, 'provides the isApply predicate')
  t.equal(crocks.isApplicative, isApplicative, 'provides the isApply predicate')
  t.equal(crocks.isArray, isArray, 'provides the isArray predicate')
  t.equal(crocks.isBifunctor, isBifunctor, 'provides the isBifunctor predicate')
  t.equal(crocks.isBoolean, isBoolean, 'provides the isBoolean predicate')
  t.equal(crocks.isCategory, isCategory, 'provides the isCategory predicate')
  t.equal(crocks.isChain, isChain, 'provides the isChain predicate')
  t.equal(crocks.isContravariant, isContravariant, 'provides the isContravariant predicate')
  t.equal(crocks.isDefined, isDefined, 'provides the isDefined predicate')
  t.equal(crocks.isEmpty, isEmpty, 'provides the isEmpty predicate')
  t.equal(crocks.isExtend, isExtend, 'provides the isExtend predicate')
  t.equal(crocks.isFoldable, isFoldable, 'provides the isFoldable predicate')
  t.equal(crocks.isFunction, isFunction, 'provides the isFunction predicate')
  t.equal(crocks.isFunctor, isFunctor, 'provides the isFunctor predicate')
  t.equal(crocks.isInteger, isInteger, 'provides the isInteger predicate')
  t.equal(crocks.isMonad, isMonad, 'provides the isMonad predicate')
  t.equal(crocks.isMonoid, isMonoid, 'provides the isMonoid predicate')
  t.equal(crocks.isNil, isNil, 'provides the isNil predicate')
  t.equal(crocks.isNumber, isNumber, 'provides the isNumber predicate')
  t.equal(crocks.isObject, isObject, 'provides the isObject predicate')
  t.equal(crocks.isPlus, isPlus, 'provides the isPlus predicate')
  t.equal(crocks.isProfunctor, isProfunctor, 'provides the isProfunctor predicate')
  t.equal(crocks.isPromise, isPromise, 'provides the isPromise predicate')
  t.equal(crocks.isSameType, isSameType, 'provides the isSameType predicate')
  t.equal(crocks.isSemigroup, isSemigroup, 'provides the isSemigroup predicate')
  t.equal(crocks.isSemigroupoid, isSemigroupoid, 'provides the isSemigroupoid predicate')
  t.equal(crocks.isSetoid, isSetoid, 'provides the isSetoid predicate')
  t.equal(crocks.isString, isString, 'provides the isString predicate')
  t.equal(crocks.isTraversable, isTraversable, 'provides the isTraversable predicate')

  // transforms
  t.equal(crocks.arrayToList, arrayToList, 'provides the arrayToList transform')
  t.equal(crocks.eitherToAsync, eitherToAsync, 'provides the eitherToAsync transform')
  t.equal(crocks.eitherToFirst, eitherToFirst, 'provides the eitherToFirst transform')
  t.equal(crocks.eitherToLast, eitherToLast, 'provides the eitherToLast transform')
  t.equal(crocks.eitherToMaybe, eitherToMaybe, 'provides the eitherToMaybe transform')
  t.equal(crocks.eitherToResult, eitherToResult, 'provides the eitherToResult transform')
  t.equal(crocks.firstToAsync, firstToAsync, 'provides the firstToAsync transform')
  t.equal(crocks.firstToEither, firstToEither, 'provides the firstToEither transform')
  t.equal(crocks.firstToLast, firstToLast, 'provides the firstToLast transform')
  t.equal(crocks.firstToMaybe, firstToMaybe, 'provides the firstToMaybe transform')
  t.equal(crocks.firstToResult, firstToResult, 'provides the firstToResult transform')
  t.equal(crocks.lastToAsync, lastToAsync, 'provides the lastToAsync transform')
  t.equal(crocks.lastToEither, lastToEither, 'provides the lastToEither transform')
  t.equal(crocks.lastToFirst, lastToFirst, 'provides the lastToFirst transform')
  t.equal(crocks.lastToMaybe, lastToMaybe, 'provides the lastToMaybe transform')
  t.equal(crocks.lastToResult, lastToResult, 'provides the lastToResult transform')
  t.equal(crocks.listToArray, listToArray, 'provides the listToArray transform')
  t.equal(crocks.maybeToAsync, maybeToAsync, 'provides the maybeToAsync transform')
  t.equal(crocks.maybeToEither, maybeToEither, 'provides the maybeToEither transform')
  t.equal(crocks.maybeToFirst, maybeToFirst, 'provides the maybeToFirst transform')
  t.equal(crocks.maybeToLast, maybeToLast, 'provides the maybeToLast transform')
  t.equal(crocks.maybeToResult, maybeToResult, 'provides the maybeToResult transform')
  t.equal(crocks.resultToAsync, resultToAsync, 'provides the resultToAsync transform')
  t.equal(crocks.resultToEither, resultToEither, 'provides the resultToEither transform')
  t.equal(crocks.resultToFirst, resultToFirst, 'provides the resultToFirst transform')
  t.equal(crocks.resultToLast, resultToLast, 'provides the resultToLast transform')
  t.equal(crocks.resultToMaybe, resultToMaybe, 'provides the resultToMaybe transform')

  t.end()
})