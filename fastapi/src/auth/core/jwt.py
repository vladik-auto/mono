import uuid
from datetime import timedelta, datetime, timezone
from jose import JWTError, jwt
from fastapi import Response
from sqlalchemy.ext.asyncio import AsyncSession

from src import config
from src.auth.schemas import User, TokenPair, JwtTokenSchema
from src.auth.exceptions import AuthFailedException
from src.auth.models import BlackListToken


REFRESH_COOKIE_NAME = "refresh"
SUB = "sub"
EXP = "exp"
IAT = "iat"
JTI = "jti"


def _create_access_token(payload: dict, minutes: int | None = None) -> JwtTokenSchema:
    expire = datetime.utcnow() + timedelta(
        minutes=minutes or config.ACCESS_TOKEN_EXPIRES_MINUTES
    )

    payload[EXP] = expire

    token = JwtTokenSchema(
        token=jwt.encode(payload, config.SECRET_KEY, algorithm=config.ALGORITHM),
        payload=payload,
        expire=expire,
    )

    return token


def _create_refresh_token(payload: dict) -> JwtTokenSchema:
    expire = datetime.utcnow() + timedelta(minutes=config.REFRESH_TOKEN_EXPIRES_MINUTES)

    payload[EXP] = expire

    token = JwtTokenSchema(
        token=jwt.encode(payload, config.SECRET_KEY, algorithm=config.ALGORITHM),
        expire=expire,
        payload=payload,
    )

    return token


def create_token_pair(user: User) -> TokenPair:
    payload = {SUB: str(user.id), JTI: str(uuid.uuid4()), IAT: datetime.utcnow()}

    return TokenPair(
        access=_create_access_token(payload={**payload}),
        refresh=_create_refresh_token(payload={**payload}),
    )


async def decode_access_token(token: str, db: AsyncSession):
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        # black_list_token = await BlackListToken.find_by_id(db=db, id=payload[JTI])
        # if black_list_token:
        #     raise JWTError("Token is blacklisted")
    except JWTError as ex:
        print(str(ex))
        raise AuthFailedException()

    return payload


def refresh_token_state(token: str):
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
    except JWTError as ex:
        print(str(ex))
        raise AuthFailedException()

    return {"token": _create_access_token(payload=payload).token}


def mail_token(user: User):
    """Return 2 hour lifetime access_token"""
    payload = {SUB: str(user.id), JTI: str(uuid.uuid4()), IAT: datetime.utcnow()}
    return _create_access_token(payload=payload, minutes=2 * 60).token


def add_refresh_token_cookie(response: Response, token: str):
    exp = datetime.utcnow() + timedelta(minutes=config.REFRESH_TOKEN_EXPIRES_MINUTES)
    exp.replace(tzinfo=timezone.utc)

    response.set_cookie(
        key="refresh",
        value=token,
        expires=int(exp.timestamp()),
        httponly=False,
        samesite='strict',
    )