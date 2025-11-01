import pandas as pd
import numpy as np
import math
import re
from sklearn.base import BaseEstimator, TransformerMixin

class NumericFeatureExtractor(BaseEstimator, TransformerMixin):
    """Custom transformer to extract numeric features from phone number strings"""

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        series = X["num_str"].astype(str)
        feats = {
            "length": [],
            "starts_140": [],
            "starts_1800": [],
            "starts_91": [],
            "unique_digits": [],
            "max_run_len": [],
            "digit_entropy": [],
            "sum_mod_10": [],
            "has_triple_repeat": [],
            "last_digit_even": [],
        }
        for s in series.tolist():
            L = len(s)
            feats["length"].append(L)
            feats["starts_140"].append(1 if s.startswith("140") else 0)
            feats["starts_1800"].append(1 if s.startswith("1800") else 0)
            feats["starts_91"].append(1 if s.startswith("91") else 0)
            feats["unique_digits"].append(len(set(s)))

            max_run, cur = 1, 1
            for i in range(1, L):
                if s[i] == s[i - 1]:
                    cur += 1
                    max_run = max(max_run, cur)
                else:
                    cur = 1
            feats["max_run_len"].append(max_run)

            counts = np.bincount(np.fromiter((ord(c) - 48 for c in s), dtype=np.int8), minlength=10)
            probs = counts / counts.sum() if counts.sum() > 0 else np.zeros(10)
            entropy = -np.sum([p * math.log(p, 2) for p in probs if p > 0])
            feats["digit_entropy"].append(float(entropy))

            feats["sum_mod_10"].append(sum(int(c) for c in s) % 10)
            feats["has_triple_repeat"].append(1 if re.search(r"(\d)\1\1", s) else 0)
            feats["last_digit_even"].append(1 if int(s[-1]) % 2 == 0 else 0)

        return pd.DataFrame(feats)
