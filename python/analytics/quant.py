from dataclasses import dataclass


@dataclass
class SimulationInput:
    notional: float
    volatility: float


def simulate(input_data: SimulationInput) -> float:
    risk_adjustment = input_data.notional * input_data.volatility
    return input_data.notional - risk_adjustment


if __name__ == "__main__":
    print(simulate(SimulationInput(notional=1_000_000, volatility=0.12)))
