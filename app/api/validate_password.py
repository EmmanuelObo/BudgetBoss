import re

MINIMUM_PASSWORD_LENGTH = 4


def validate_password(password):
    if len(password) < MINIMUM_PASSWORD_LENGTH:
        return False
    return True
