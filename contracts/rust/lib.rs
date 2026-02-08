pub struct SettlementEngine {
    pub version: &'static str,
}

impl SettlementEngine {
    pub fn new() -> Self {
        Self { version: "0.1.0" }
    }

    pub fn compute_settlement(&self, notional: u128, fee_bps: u16) -> u128 {
        let fee = notional * fee_bps as u128 / 10_000u128;
        notional.saturating_sub(fee)
    }
}
