# DSG Benchmarking Methodology

## Environment
- CPU: 8-core ARM64
- RAM: 16GB
- OS: Linux (Deterministic Kernel)

## Test Cases
1. **ERC20 Transfer**: 1,000,000 transitions.
2. **Uniswap V3 Swap**: 100,000 complex state changes.
3. **Governance Vote**: 50,000 multi-signature validations.

## Results (Latency per Proof)
- State Extraction: 12ms
- Trace Verification: 45ms
- Total Audit Time: 57ms
