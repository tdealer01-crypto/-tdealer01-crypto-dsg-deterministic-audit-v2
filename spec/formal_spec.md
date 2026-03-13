# DSG Formal Specification v1.0

## 1. State Machine Definition
A system $S$ is defined as a tuple $(Q, \Sigma, \delta, q_0)$ where:
- $Q$ is a finite set of states.
- $\Sigma$ is a finite set of inputs.
- $\delta: Q \times \Sigma \to Q$ is the deterministic transition function.
- $q_0 \in Q$ is the initial state.

## 2. Determinism Constraint
For any state $q \in Q$ and input $\sigma \in \Sigma$, the transition $\delta(q, \sigma)$ must yield exactly one state $q'$. In the context of DSG, this means all external dependencies (timestamps, block hashes, oracles) must be passed as explicit inputs in $\Sigma$.

## 3. Invariant Safety
An invariant $I$ is a predicate $I: Q \to \{True, False\}$.
A system $S$ is **DSG-Safe** with respect to $I$ if:
$\forall q \in Reachable(S), I(q) = True$.
