"""empty message

Revision ID: 6e80967d9afd
Revises: 7d980e9f1844
Create Date: 2022-09-07 18:21:33.829450

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e80967d9afd'
down_revision = '7d980e9f1844'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'age',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('user', 'gender',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'gender',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    op.alter_column('user', 'age',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    # ### end Alembic commands ###
