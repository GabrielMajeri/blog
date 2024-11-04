---
layout: post
title: "The Lie product formula"
comments: true
---

The [**Lie product formula**](https://en.wikipedia.org/wiki/Lie_product_formula) (also known as the **Lie-Trotter** or the **Trotter-Kato** or the **Suzuki-Trotter formula**) is a well-known result from Lie group theory[^1] which can be used to simplify computations involving exponentials of matrices or linear operators.

The formula states that

$$
  e^{X \, + \, Y} = \lim_{k \, \to \, \infty} \left(e^{X / k} \, e^{Y / k}\right)^k
$$

This blog post povides a brief introduction and some motivation for studying the Lie product formula, then gives a detailed proof of the result[^2].

[^1]: Or rather functional analysis.
[^2]: One which I find personally to be the simplest to understand, requiring the least amount of mathematical prerequisites; it is based on [this Mathematics Stack Exchange answer](https://math.stackexchange.com/a/2030685/388180) from the anonymous `user159517`, whom I thank for writing up a fairly clear overview of the steps involved.

<!-- more -->

## Motivation for studying the formula

**Quantum mechanics** usually involves doing a lot of computations with [bounded linear operators](https://en.wikipedia.org/wiki/Bounded_operator) (usually arising as differential operators, but this matters little for the current discussion). One often needs to compute exponentials of linear operators which are themselves the sum or product of simpler operators (for which we know how to compute the exponential, or for which we know how their exponential acts on a vector space basis).

For example, [the Hamiltonian operator](https://en.wikipedia.org/wiki/Hamiltonian_(quantum_mechanics)) (whose eigenvalues correspond to the energy levels of the system) is of essential importance to studying the time-evolution of quantum mechanical systems. It can be broken down into two parts, the **kinetic energy** term $$\hat{T}$$ and the **potential energy** term $$\hat{V}$$:

$$
  \hat{H} = \hat{T} + \hat{V}
$$

In some cases, it would be convenient to break up $$e^\hat{H}$$ into an expression involving $$e^\hat{T}$$ and $$e^\hat{V}$$.

This kind of result also has applications in **finance** (especially when the formulas are implemented numerically). For example, there is a method called [Strang splitting](https://en.wikipedia.org/wiki/Strang_splitting) which can be used to help solve differential equations. It is based on the [Baker-Campbell-Hausdorff-Dynkin formula](https://en.wikipedia.org/wiki/Baker%E2%80%93Campbell%E2%80%93Hausdorff_formula) (which will be described below). In Autumn 2023, Viorel Costeanu (former Executive Director of JP Morgan) held a presentation at the [FMI-UB](https://fmi.unibuc.ro/)/[IMAR](http://imar.ro/) [Probability Seminar](https://sites.google.com/view/master-probabilitati-fmi/seminarul-stiintific-probabilitati-si-teme-conexe?authuser=0), titled _Analytical approximations with Strang splitting_, where he described an improvement to this formula which they used in practice to efficiently solve [stochastic differential equations](https://en.wikipedia.org/wiki/Stochastic_differential_equation).

## Mathematical formulation of the problem

For real numbers, the following equality holds:

$$
    e^{x \, + \, y} = e^x e^y
$$

Unfortunately, for matrices or (more generally) linear operators, this only works if the two operators commute (i.e. if $$[A, B] = AB - BA = 0$$).

### The case of commuting operators

**Theorem.** In the following discussion, let $$X$$ be a Banach space. Let $$A, B \in \mathcal{B}(X)$$ be two bounded (continuous) operators on $$X$$. If $$[A, B] = 0$$, then

$$
  e^{A \, + \, B} = e^A \, e^B
$$

**Proof.** Let $$f(t) = e^{(A + B)t} e^{-B t} e^{-A t}$$. We have that

$$
\begin{gather*}
  f'(t) = \left(e^{(A + B)t}\right)' e^{-B t} e^{-A t} + e^{(A + B) t} \left(e^{-B t}\right)' e^{-A t} + e^{(A + B) t} e^{-B t} \left(e^{-A t}\right)' \\[1em]
  = (A + B) \, e^{(A + B)t} e^{-B t} e^{-A t} + e^{(A + B) t} (-B) e^{-B t} e^{-A t} + e^{(A + B) t} e^{-B t} (-A) e^{-A t}
\end{gather*}
$$

If we assume that $$A$$ and $$B$$ commute (i.e. $$[A, B] = 0$$), then because

$$
  e^X = \sum_{k \, = \, 0}^{\infty} \frac{1}{k!} X^k
$$

using the [Cauchy product formula](https://en.wikipedia.org/wiki/Cauchy_product) we can write

$$
\begin{align*}
  f'(t) &= (A + B) \, e^{(A + B)t} e^{-B t} e^{-A t} - B e^{(A + B) t} e^{-B t} e^{-A t} - A e^{(A + B) t} e^{-B t} e^{-A t} \\[1em]
  &= (A + B) \, e^{(A + B)t} e^{-B t} e^{-A t} - (A + B) e^{(A + B) t} e^{-B t} e^{-A t} \\[1em]
  &= 0
\end{align*}
$$

hence $$f$$ is a constant. In particular, $$f(0) = e^{(A + B) \, \cdot \, 0} \cdot e^{-B \, \cdot \, 0} \cdot e^{-A \, \cdot \, 0} = 1$$, hence $$f(t) \equiv 1$$, $$\forall t \in \mathbb{R}$$. This shows that the exponential of a sum of commuting operators is equal to the product of the exponentials of the respective operators. $$\square$$

### The Baker-Campbell-Hausdorff-Dynkin formula

One popular formula to use when the operators do not commute is the [Baker-Campbell-Hausdorff-Dynkin formula](https://en.wikipedia.org/wiki/Baker%E2%80%93Campbell%E2%80%93Hausdorff_formula), which says that

$$
  e^{X} e^{Y} = e^{X \, + \, Y \, + \, \frac{1}{2} [X, \, Y] \, + \, \frac{1}{12} \left([X, \, [X, \, Y]] \, - \, [Y, \, [X, \, Y]]\right) \, + \, ...}
$$

for arbitrary $$A, B \in \mathcal{B}(X)$$ (not necessarily commuting).

This formula is very useful in pure mathematics as well, where it can be used to prove [the Lie group -- Lie algebra correspondence](https://en.wikipedia.org/wiki/Lie_group%E2%80%93Lie_algebra_correspondence)[^3].

### The Lie product formula

The [**Lie product formula**](https://en.wikipedia.org/wiki/Lie_product_formula) (also known as the **Lie-Trotter formula** or the **Trotter-Kato formula**) says that the exponential of a sum of operators can be rewritten as

$$
  e^{X \, + \, Y} = \lim_{k \, \to \, \infty} \left(e^{X / k} \cdot e^{Y / k}\right)^k
$$

Lie discovered and proved this theorem for matrices. Trotter, Kato and Suzuki extended this later on to a large class of operators.

[^3]: Read [here](https://en.wikipedia.org/wiki/Lie_group%E2%80%93Lie_algebra_correspondence#Proof_of_the_homomorphisms_theorem) for a proof or watch [this video](https://www.youtube.com/watch?v=wZ0fKi1OuOM).

## Proof of the Lie product formula

In the rest of this article, I'm going to focus on a (relatively elementary) proof of the Lie product formula. It's based on [this](https://math.stackexchange.com/a/2030685/388180) Math Exchange answer, together with some details worked out separately. I'd like to thanks [Prof. Sorin Dăscălescu](https://acad.ro/acad_membri/membri/Dascalescu_Sorin.html) from [FMI-UB](https://fmi.unibuc.ro/) for help with figuring out some details of the proof.

Let $$X$$ be a [Banach space](https://en.wikipedia.org/wiki/Banach_space) (a topological vector space equipped with a norm which makes it complete as a metric space) and $$A, B \in \mathcal{B} (X)$$ two [bounded linear operators](https://en.wikipedia.org/wiki/Bounded_operator) (i.e. $$\lVert A \rVert < \infty, \lVert B \rVert < \infty$$).

We will first prove the following lemma:

**Lemma.** $$\left\lVert e^A \right\rVert \leq e^{\lVert A \rVert}$$ (the norm of the exponential is less than the exponential of the norm)

**Proof.** We rewrite the exponential in terms of its definition and then we apply the [triangle inequality](https://en.wikipedia.org/wiki/Triangle_inequality):

$$
\begin{align*}
  \left\lVert e^A \right\rVert &= \left\lVert \mathrm{Id} + \frac{1}{1!} A + \frac{1}{2!} A^2 + \ldots + \frac{1}{k!} A^k + \ldots \right\rVert \\[0.5em]
  &\leq \lVert \mathrm{Id} \rVert + \frac{1}{1!} \lVert A \rVert + \frac{1}{2!} \left\lVert A^2 \right\rVert + \ldots + \frac{1}{k!} \left\lVert A^k \right\rVert + \ldots \\[0.5em]
  &= 1 + \frac{1}{1!} \lVert A \rVert + \frac{1}{2!} \lVert A \rVert ^2 + \ldots + \frac{1}{k!} \lVert A \rVert^k + \ldots \\[0.5em]
  &= e^{\lVert A \rVert} \hspace{17em} \square
\end{align*}
$$

Let $$C = e^{(A \, + \, B) / k}$$, $$D = e^{A/k} \cdot e^{B/k}$$. Firstly we will come up with some estimates for the _norms_ of these operators. For $$C$$, we have

$$
\begin{align*}
  \lVert C \rVert &= \left\lVert e^{(A \, + \, B)/k} \right\rVert \\[0.5em]
  &\leq e^{\lVert A + B \rVert / k} \tag{by lemma} \\[0.5em]
  &\leq e^{\left(\lVert A \rVert + \lVert B \rVert\right) / k} \tag{triangle inequality}
\end{align*}
$$

whereas for $$D$$ we get

$$
\begin{align*}
  \lVert D \rVert = \left\lVert e^{A/k} \cdot e^{B/k} \right\rVert &= \left\lVert e^{A/k} \right\rVert \cdot \left\lVert e^{B/k} \right\rVert \\[0.5em]
  &\leq e^{\lVert A/k \rVert} \cdot e^{\lVert B/k \rVert} \tag{by lemma} \\[0.5em]
  &= e^{\lVert A \rVert / k \, + \, \lVert B \rVert / k} \\[0.5em]
  &= e^{(\lVert A \rVert + \lVert B \rVert) / k}
\end{align*}
$$

We can use the [Cauchy product formula](https://en.wikipedia.org/wiki/Cauchy_product) again, this time applying it on D:

$$
\begin{align*}
  D = e^{A/k} \cdot e^{B/k} &=
  \left(\sum_{i \, = \, 0}^{\infty} \frac{(A/k)^i}{i!}\right)
  \cdot
  \left(\sum_{j \, = \, 0}^{\infty} \frac{(B/k)^j}{j!}\right) \\[0.5em]
  &= \sum_{l \, = \, 0}^{\infty} \frac{1}{k^l} \sum_{m \, = \, 0}^{l} \frac{A^m}{m!} \cdot \frac{B^{l - m}}{(l - m)!}
\end{align*}
$$

Now we can obtain an estimate for $$\lVert C - D \rVert$$:

$$
\begin{gather*}
  \lVert C - D \rVert = \left\lVert e^{(A + B)/k} - e^{A/k} \cdot e^{B/k} \right\rVert = \\[1em]
  = \left\lVert \left(\sum_{i = 0}^{\infty} k^{-i} \, \frac{(A + B)^i}{i!}\right) - \left(\sum_{l = 0}^{\infty} k^{-l} \sum_{m = 0}^{l} \frac{A^m}{m!} \cdot \frac{B^{l - m}}{(l - m)!}\right)\right\rVert
\end{gather*}
$$

For $$i = l = 0$$, both sums equal $$\mathbb{1}_n$$, so these terms cancel out. For $$i = l = 1$$, we get $$\frac{1}{k} (A + B)$$ and $$\frac{A}{k} + \frac{B}{k}$$, so they also cancel.

$$
\begin{gather*}
  = \left\lVert \sum_{i \, = \, 2}^{\infty} k^{-i} \frac{(A + B)^i}{i!} - \sum_{l \, = \, 2}^{\infty} k^{-l} \sum_{m \, = \, 0}^{l} \frac{A^m}{m!} \cdot \frac{B^{l - m}}{(l - m)!}\right\rVert \\[1em]
  \leq \left\lVert \sum_{i \, = \, 2}^{\infty} k^{-i} \frac{(A + B)^i}{i!} \right\rVert + \left\lVert \sum_{l \, = \, 2}^{\infty} k^{-l} \sum_{m \, = \, 0}^{l} \frac{A^m}{m!} \cdot \frac{B^{l - m}}{(l - m)!} \right\rVert \\[1em]
  \leq \sum_{i \, = \, 2}^{\infty} k^{- i} \frac{\lVert A + B \rVert^i}{i!} + \sum_{l \, = \, 2}^{\infty} k^{- l} \sum_{m \, = \, 0}^{l} \frac{\lVert A \rVert^m}{m!} \cdot \frac{\lVert B \rVert^{l - m}}{(l - m)!} \\[1em]
  \leq k^{-2} \left(\sum_{i \, = \, 2}^{\infty} \frac{\lVert A + B \rVert^i}{i!} + \sum_{l \, = \, 2}^{\infty} \sum_{m \, = \, 0}^{l} \frac{\lVert A \rVert^m}{m!} \cdot \frac{\lVert B \rVert^{l - m}}{(l - m)!}\right) \\[1em]
  \leq k^{-2} \left(e^{\lVert A + B \rVert} + \sum_{l \, = \, 2}^{\infty} \frac{1}{l!} \sum_{m \, = \, 0}^{l} {l \choose m} \lVert A \rVert^m \lVert B \rVert^{l - m}\right)
\end{gather*}
$$

(where on the last line we've used the definition $${l \choose m} = \frac{l!}{m! (l - m)!}$$, hence $$\frac{1}{m!} \cdot \frac{1}{(l - m)!} = \frac{1}{l!} \cdot {l \choose m}$$)

$$
\begin{gather*}
  \leq k^{-2} \left(e^{\lVert A \rVert + \lVert B \rVert} + \sum_{l \, = \, 2}^{\infty} \frac{1}{m!} \left(\lVert A \rVert + \lVert B \rVert^m\right)\right) \\[1em]
  = \frac{2}{k^2} e^{\lVert A \rVert + \lVert B \rVert}
\end{gather*}
$$

To summarize, we got

$$
  \lVert C - D \rVert \leq \frac{2}{k^2} e^{\lVert A \rVert + \lVert B \rVert}
$$

Now we will use the **difference of powers** formula, adapted for the non-commutative case:

$$
  \lVert C^k - D^k \rVert = \left\lVert \sum_{l \, = \, 0}^{k \, - \, 1} C^l (C - D) D^{k - l - 1} \right\rVert
$$

I couldn't find the proof for this formula elsewhere in the literature, so we are going to show why it holds in the following.

Let $$S_k = \sum_{l \, = \, 0}^{k \, - \, 1} C^l (C - D) D^{k - l -1}$$. We have

$$
\begin{gather*}
  S_k = \sum_{l \, = \, 0}^{k \, - \, 1} \left(C^{l + 1} D^{k - l - 1} - C^{l} D^{k - l}\right) \\[0.5em]
  = \underline{C D^{k - 1}} - D^k
  + \, \underline{\underline{C^2 D^{k - 2}}} - \underline{C D^{k - 1}} \\[0.5em]
  + \, C^3 D^{k - 3} - \underline{\underline{C^2 D^{k - 2}}}
  + \, \dots + \\[0.5em]
  + \, C^k - C^{k - 1} D
  = C^k - D^k
\end{gather*}
$$

as claimed.

Continuing with our estimate, we have

$$
  \left\lVert \sum_{l \, = \, 0}^{k \, - \, 1} C^l (C - D) D^{k - l - 1} \right\rVert
  \leq \sum_{l \, = \, 0}^{k \, - \, 1} \left\lVert C^l \right\rVert \left\lVert C - D \right\rVert \left\lVert D^{k - l - 1} \right\rVert
$$

For $$k$$ and $$l$$ fixed, we have

$$
\begin{gather*}
  \lVert C \rVert^l \cdot \lVert D \rVert^{k - l - 1} = \left\lVert e^{(A + B)/k} \right\rVert^l \cdot \left\lVert e^{A/k} e^{B/k} \right\rVert^{k - l - 1} \\[1em]
  \leq \left(e^{(\lVert A \rVert + \lVert B \rVert)/k}\right)^l \cdot \left(e^{\lVert A \rVert / k}\right)^{k - l - 1} \cdot \left(e^{\lVert B \rVert / k}\right)^{k - l - 1} \\[1em]
  \leq \exp\left(\frac{l}{k} \left(\lVert A \rVert + \lVert B \rVert\right) + \frac{k - l - 1}{k} \lVert A \rVert + \frac{k - l - 1}{k} \lVert B \rVert\right) \\[1em]
  = \exp\left(\frac{l}{k} \lVert A \rVert + \frac{k - l - 1}{k} \lVert A \rVert + \frac{l}{k} \lVert B \rVert + \frac{k - l - 1}{k} \lVert B \rVert\right) \\[1em]
  = \exp\left(\frac{k - 1}{k} \lVert A \rVert + \frac{k - 1}{k} \lVert B \rVert\right)
  = \exp\left(\frac{k - 1}{k} \left(\lVert A \rVert + \lVert B \rVert\right)\right) \\[1em]
  \leq e^{\lVert A \rVert + \lVert B \rVert}
\end{gather*}
$$

Hence, going back to the difference of powers formula, we obtain

$$
\begin{gather*}
  \left\lVert \sum_{l \, = \, 0}^{k \, - \, 1} C^l (C - D) D^{k - l - 1} \right\rVert
  \; \leq \; \sum_{l \, = \, 0}^{k \, - \, 1} \left\lVert C \right\rVert^l \left\lVert C - D \right\rVert \left\lVert D \right\rVert^{k - l - 1} \\[1em]
  \leq \; \sum_{l \, = \, 0}^{k \, - \, 1} e^{\lVert A \rVert + \lVert B \rVert} \cdot \lVert C - D \rVert
  \; \leq \; k \cdot e^{\lVert A \rVert + \lVert B \rVert} \cdot \lVert C - D \rVert
\end{gather*}
$$

Now recall our earlier bound for $$\lVert C - D \rVert$$,

$$
  \lVert C - D \rVert \leq \frac{2}{k^2} e^{\lVert A \rVert + \lVert B \rVert}
$$

We can plug it into the previous expression to deduce that

$$
\begin{align*}
  \left\lVert C^k - D^k \right\rVert &\leq k \cdot e^{\lVert A \rVert \, + \, \lVert B \rVert} \cdot \frac{2}{k^2} \cdot e^{\lVert A \rVert \, + \, \lVert B \rVert} \\
  &= \frac{2}{k} \cdot e^{2 \lVert A \rVert \, + \, 2 \lVert B \rVert}
\end{align*}
$$

Taking the limit, we have

$$
\begin{gather*}
  \lim_{k \, \to \, \infty} \left\lVert C^k - D^k \right\rVert = \lim_{k \, \to \, \infty} \left\lVert e^{(A \, + \, B)/k} - e^{A/k} \cdot e^{B/k} \right\rVert \\[1em]
  \leq \lim_{k \, \to \, \infty} \left(\frac{2}{k} \cdot e^{2\lVert A \rVert \, + \, 2\lVert B \rVert}\right) \to 0
\end{gather*}
$$

This shows that $$e^{(A \, + \, B)/k}$$ converges in norm to $$e^{A/k} \cdot e^{B/k}$$. Since the mapping $$X \mapsto X^{k}$$ is continuous, we have that $$e^{A \, + \, B}$$ converges in norm to $$\left(e^{A/k} \cdot e^{B/k}\right)^k$$, which is what we had to show in order to prove the Lie product formula. $$\square$$

## Conclusion

While most physicists are only interested in theorems and formulas in order to be able to simplify their computations and get through with what they're currently working on, mathematicians (and mathematical physicists) tend to also appreciate the beauty and importance of formal proofs of the correctness of their results. Furthermore, these proofs also serve an important role in identifying the limitations and inherent assumptions in every result (i.e. "in which cases does this formula hold?").
