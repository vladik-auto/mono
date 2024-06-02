"""employee

Revision ID: d12d58490a36
Revises: 4c2c005e27c8
Create Date: 2024-06-01 00:47:20.665002

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd12d58490a36'
down_revision: Union[str, None] = '4c2c005e27c8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('violation_video_id_fkey', 'violation', type_='foreignkey')
    op.drop_column('violation', 'video_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('violation', sa.Column('video_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('violation_video_id_fkey', 'violation', 'video', ['video_id'], ['id'])
    # ### end Alembic commands ###